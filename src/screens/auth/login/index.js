import React from 'react';
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import BaseClass from '../../../utils/BaseClass';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import COLORS from '../../../utils/Colors';
import STRINGS from '../../../utils/Strings';
import {MainContainer, SafeAreaViewContainer, ScrollContainer,} from '../../../utils/BaseStyle';
import {Spacer} from '../../../components/spacer';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import {connect} from 'react-redux';
//import * as _ from 'lodash';
import OrientationLoadingOverlay from '../../../utils/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {CommonActions} from '@react-navigation/native';
//import {CheckEmailAction} from '../../../../redux/actions/CheckEmailAction';
import TopHeader from '../../../components/header';
import {TextInput} from 'react-native-paper';
import {LoginAction} from '../../../redux/actions/LoginAction';
import {CommonActions} from '@react-navigation/native';
import AppConstant from "../../../utils/constants";

const passregx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

class Login extends BaseClass {
    constructor(props) {
        super(props);
        //   const {Alldata} = this.props.route.params;

        this.state = {
            checked: false,
            username: '',
            email: '',
            validEmail: '',
            labelEmail: '',
            password: '',
            labelPassword: '',
            validPassword: '',
            areAllValuesValid: false,
            isLoading: false,
            image: '',
            fcmToken: '',
        };
    }

    componentDidMount() {
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.onFocusFunction();
        });
    }

    onFocusFunction = async () => {
        const deviceToken = await AsyncStorage.getItem('FcmToken');
        const fcmTok = JSON.parse(deviceToken);
        this.setState({
            fcmToken: fcmTok,
        });
    };

    componentWillUnmount() {
        this._unsubscribe();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const {navigation} = this.props;
        const {navigate} = navigation;
        const {loginResponse} = nextProps.loginState;
        const {checked, email, username, password} = this.state;
    }

    forgotPasswordClick() {
        const {navigation} = this.props;
        const {navigate} = navigation;
        navigate('ResetPassword');
    }

    // loginClick() {
    //     const {navigation} = this.props;
    //     const {navigate} = navigation;
    //     //  this.showDialog();
    //     navigate('homeScreen');
    //     //alert('Coming Soon...');
    // }

    LoginApiAction = async () => {
        const {
            validEmail,
            email,
            username,
            validPassword,
            password,
            fcmToken,
        } = this.state;
        console.warn('checkToken', fcmToken);
        LoginAction(
            {
                // email: email,
                data: JSON.stringify({
                    username: username.toLowerCase(),
                    password: password,
                })

                // deviceToken: fcmToken,
            },
            data => this.handleLoginResponse(data),
        );
        this.showDialog();
    };

    loginClick = async () => {
        const {navigation} = this.props;
        const {navigate} = navigation;
        // navigate('homeScreen');
        const {validEmail, username, validPassword, password} = this.state;
        if (username === undefined || username.trim().length === 0) {
            this.setState({areAllValuesValid: false});
            this.showToastSucess('Please enter your Username.');
        } else if (password === undefined || password.trim().length === 0) {
            this.setState({areAllValuesValid: false});
            this.showToastSucess('Please enter your password.');
        } else if (!passregx.test(password)) {
            this.showToastSucess(
                'Password should be strong! Min 8 characters required including 1 upper/lowercase, 1 special & 1 numeric character.',
            );
            return false;
        } else {
            // this.showToastAlert(STRINGS.Internet_Connection);
            this.setState({areAllValuesValid: true});
            this.LoginApiAction();
        }
    };

    handleLoginResponse = response => {
        console.warn("reddd", response)

        const {navigation} = this.props;
        const {navigate} = navigation;
        //  navigate('homeScreen');
        const {checked, username} = this.state;
        if (response !== 'Network Error') {
            this.hideDialog();
            const {code, message, data} = response;
            if (code == '200') {
                this.hideDialog();
                AsyncStorage.setItem('loginToken', response.access_token);
                AsyncStorage.setItem('userDetail', JSON.stringify(response.document));
                AsyncStorage.setItem('loginUserId', response.document._id);
                AppConstant.shared.globalStoredUserInfo = response.document;
                //   console.warn("token today",response.access_token)
                this.showToastSucess(response.message);

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Tabs',
                                params: {data: {edit: false}}, // if you want to send data to home screen
                            },
                        ],
                    }),
                );

                //  navigate('Tabs');
            } else if (code == '401') {
                this.hideDialog();
                this.showToastSucess(response.message);
            } else if (code == '400') {
                this.hideDialog();
                this.showToastSucess(response.message);
            }
        } else {
            this.hideDialog();
            this.showToastAlert(STRINGS.CHECK_INTERNET);
        }
    };

    // =============================================================================================
    // Render method for Custom Loader
    // =============================================================================================

    _renderCustomLoader = () => {
        const {isLoading} = this.state;
        return (
            <OrientationLoadingOverlay
                visible={isLoading}
                message={STRINGS.LOADING_TEXT}
            />
        );
    };

    // ----------------------------------------
    // ----------------------------------------
    // RENDERS
    // ----------------------------------------

    _renderInputs = () => {
        const {navigate} = this.props.navigation;
        const {username, labelEmail, labelPassword, checked, password} = this.state;
        // const [text, setText] = React.useState('');
        return (
            <View style={{width: wp('90%'), alignItems: 'center'}}>
                <TextInput
                    style={{
                        backgroundColor: COLORS.app_theme_color,
                        width: wp('90%'),
                        height: wp('11%'),
                        paddingVertical: wp('2%'),
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextSmall,
                    }}
                    theme={{
                        roundness: wp('12%'),
                        colors: {
                            primary: COLORS.white_color,
                            text: COLORS.white_color,
                            placeholder: COLORS.white_color,
                            fontSize: FONT.TextHero,
                            fontFamily: FONT_FAMILY.BentonSansMedium,
                        },
                    }}
                    maxLength={30}
                    left={'29'}
                    mode="outlined"
                    label="Username"
                    value={username}
                    onChangeText={text =>
                        this.setState({
                            username: text,
                        })
                    }
                    returnKeyType={'next'}
                />
                <Spacer space={'1%'}/>
                <TextInput
                    style={{
                        backgroundColor: COLORS.app_theme_color,
                        width: wp('90%'),
                        height: wp('11%'),
                        paddingVertical: wp('2%'),
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextSmall,
                    }}
                    theme={{
                        roundness: wp('12%'),
                        colors: {
                            primary: COLORS.white_color,
                            text: COLORS.white_color,
                            placeholder: COLORS.white_color,
                            fontFamily: FONT_FAMILY.BentonSansMedium,
                        },
                    }}
                    maxLength={30}
                    mode="outlined"
                    label="Password"
                    value={password}
                    onChangeText={text =>
                        this.setState({
                            password: text,
                        })
                    }
                    secureTextEntry={true}
                    returnKeyType={'done'}
                />
            </View>
        );
    };

    // =============================================================================================
    // Render method for Custom Loader
    // =============================================================================================

    _renderCustomLoader = () => {
        const {isLoading} = this.state;
        return (
            <OrientationLoadingOverlay
                visible={isLoading}
                message={STRINGS.LOADING_TEXT}
            />
        );
    };

    checkAllValues = () => {
        const {validEmail, username, validPassword, password} = this.state;
        if (validEmail !== '' || username.length === 0) {
            this.setState({areAllValuesValid: false});
        } else {
            /* else if (password !== '' || password.length === 0) {
                         this.setState({areAllValuesValid: false});
                     }*/
            this.setState({areAllValuesValid: true});
        }
    };

    render() {
        const {image, areAllValuesValid} = this.state;
        const {navigation} = this.props;
        const {navigate} = navigation;
        return (
            <>
                <TopHeader
                    onPressBackArrow={() =>
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{name: 'splash'}],
                            }),
                        )
                    }
                    backgroundColor={COLORS.app_theme_color}
                />
                <SafeAreaViewContainer
                    style={{backgroundColor: COLORS.app_theme_color}}>
                    <KeyboardAvoidingView
                        style={{flex: 1, backgroundColor: COLORS.app_theme_color}}
                        behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <TouchableWithoutFeedback
                            onPress={() => {
                                Keyboard.dismiss();
                            }}>
                            <ScrollContainer>
                                <MainContainer>
                                    <Image
                                        source={require('../../../assets/images/Mainlogo.png')}
                                        style={{
                                            alignSelf: 'center',
                                            width: wp('50%'),
                                            height: hp('17%'),
                                            //  backgroundColor: "pink",
                                            resizeMode: 'contain',
                                        }}
                                    />
                                    <Spacer space={wp('1%')}/>
                                    {this._renderInputs()}
                                    <Spacer space={3}/>
                                    <View style={{alignItems: 'flex-end', width: wp('85%')}}>
                                        <TouchableOpacity
                                            onPress={() => this.forgotPasswordClick()}>
                                            <Text
                                                style={{
                                                    fontSize: FONT.TextSmall,
                                                    color: COLORS.white_color,
                                                    textAlign: 'center',
                                                    fontFamily: FONT_FAMILY.BentonSansMedium,
                                                }}>
                                                {STRINGS.FORGOT_PASSWORD}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    <Spacer space={wp('8%')}/>
                                    <View style={{alignItems: 'center', width: wp('35%')}}>
                                        <NewPrimaryButton
                                            isDisabled={!areAllValuesValid}
                                            bgColor={
                                                areAllValuesValid
                                                    ? COLORS.off_green
                                                    : COLORS.invalid_color
                                            }
                                            onPress={() => this.loginClick()}
                                            fontFamily={FONT_FAMILY.BentonSansBold}
                                            btnText={'LOG IN'}
                                            width={wp(6)}
                                            borderColor={COLORS.app_theme_color}
                                            borderRadius={wp(8)}
                                            verticalPaddingWithText={wp('0.6%')}
                                            textColor={COLORS.app_theme_color}
                                            color={'#FFFFFF'}
                                        />
                                    </View>
                                    {/*<Spacer space={wp("4%")}/>*/}
                                </MainContainer>
                                {this._renderCustomLoader()}
                            </ScrollContainer>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                </SafeAreaViewContainer>
            </>
        );
    }
}

// ----------------------------------------
// ----------------------------------------
// CONNECT
// ----------------------------------------

const mapStateToProps = state => ({
    loginState: state.LoginReducer,
});

// ----------------------------------------

const mapDispatchToProps = dispatch => {
    return {
        loginApi: payload => dispatch(LoginAction(payload)),
    };
};

// ----------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(Login);
