import React from 'react';
import {Image, Keyboard, KeyboardAvoidingView, Text, TouchableWithoutFeedback, View,} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import BaseClass from '../../../utils/BaseClass';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import COLORS from '../../../utils/Colors';
import STRINGS from '../../../utils/Strings';
import {MainContainer, SafeAreaViewContainer, ScrollContainer} from '../../../utils/BaseStyle';
import {Spacer} from '../../../components/spacer';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
//import {LoginAction} from '../../../../redux/actions/LoginAction';
import {connect} from 'react-redux';
import OrientationLoadingOverlay from '../../../utils/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {CommonActions} from '@react-navigation/native';
//import {CheckEmailAction} from '../../../../redux/actions/CheckEmailAction';
import TopHeader from '../../../components/header';
import {TextInput} from 'react-native-paper';


class ResetPassword extends BaseClass {
    constructor(props) {
        super(props);
        //   const {Alldata} = this.props.route.params;

        this.state = {
            checked: false,
            username: '',
            validUsername: '',
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
        console.warn('test2', deviceToken);
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
        const {checked, username, password} = this.state;

    }


    forgotPasswordClick() {
        const {navigate} = this.props.navigation;
        alert('Coming Soon...');
    }


    loginClick = () => {
        const {validUsername, username, validPassword, password} = this.state;
        if (validUsername === undefined || username.trim().length === 0) {
            //  this.showToastAlert(STRINGS.valid_email);
        } else if (validPassword === undefined || password.trim().length === 0) {
            //  this.showToastAlert(STRINGS.valid_Password);
        } else {
            this.showToastAlert(STRINGS.Internet_Connection);
        }
    };

    handleLoginResponse = (response) => {
        console.warn('LoginResponse-->', response.errorLogin);
        const {navigation} = this.props;
        const {navigate} = navigation;
        const {checked, username} = this.state;
        if (response !== 'Network Error') {
            this.hideDialog();
            const {code, message, data} = response;
            if (code == 200) {
                this.hideDialog();
                this.showToastSucess('Logged in successfully.');
                if (response) {
                    this.setState({
                        username: '',
                    });
                    AsyncStorage.setItem('accessToken', response.token);
                    AsyncStorage.setItem('loginData', JSON.stringify(response.data));
                    AsyncStorage.setItem('userType', response.user_type);
                    navigation.dispatch(
                        CommonActions.reset({
                            index: 0,
                            routes: [
                                {
                                    name: 'personalHome',
                                    params: {},
                                },
                            ],
                        }),
                    );

                }
            } else if (code === '202') {
                this.hideDialog();
                navigate('setPasswordScreen');
                this.showToastSucess(data);

            } else if (code === '203') {
                this.hideDialog();
                this.showToastSucess('Wrong Password.');
                //this.showToastSucess(response.errorLogin);

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
            <OrientationLoadingOverlay visible={isLoading} message={STRINGS.LOADING_TEXT}/>
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
                        },
                    }}
                    left={'29'}
                    mode="outlined"
                    label="Username, Mobile Number or Email"
                    value={username}
                    onChangeText={text => this.setState({
                        username: text,
                    })}
                    returnKeyType={'next'}
                />
                <Spacer space={2}/>
            </View>
        );
    };

    // =============================================================================================
    // Render method for Custom Loader
    // =============================================================================================

    _renderCustomLoader = () => {
        const {isLoading} = this.state;
        return (
            <OrientationLoadingOverlay visible={isLoading} message={STRINGS.LOADING_TEXT}/>
        );
    };


    render() {
        const {image, areAllValuesValid} = this.state;
        const {navigation} = this.props;
        const {navigate} = navigation;
        return (
            <>
                <TopHeader
                    onPressBackArrow={() => navigation.pop()}
                    backgroundColor={COLORS.app_theme_color}
                />
                <SafeAreaViewContainer style={{backgroundColor: COLORS.app_theme_color}}>
                    <KeyboardAvoidingView
                        style={{flex: 1, backgroundColor: COLORS.app_theme_color}}
                        behavior={(Platform.OS === 'ios') ? 'padding' : null}>
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
                                    <Spacer space={wp("1%")}/>
                                    <View style={{
                                        justifyContent: 'space-evenly',
                                        alignItems: 'flex-start',
                                        width: wp('90%')
                                    }}>
                                        <Text style={{
                                            fontSize: FONT.TextSmall,
                                            color: COLORS.white_color,
                                            textAlign: 'center',
                                            fontFamily: FONT_FAMILY.BentonSansMedium,
                                        }}>{STRINGS.FORGOT_PASSWORD}

                                        </Text>
                                        <Spacer space={wp("0.3%")}/>
                                        <Text style={{
                                            fontSize: FONT.TextExtraSmall,
                                            color: COLORS.white_color,
                                            fontFamily: FONT_FAMILY.BentonSansMedium,

                                        }}
                                        >{STRINGS.FORGIT_PASS_TEXT}</Text>
                                    </View>
                                    <Spacer space={wp("1%")}/>
                                    {this._renderInputs()}
                                    <Spacer space={wp("10%")}/>
                                    <View style={{alignItems: 'center', width: wp('35%')}}>
                                        <NewPrimaryButton
                                            onPress={() => this.loginClick()}
                                            fontFamily={FONT_FAMILY.BentonSansMedium}
                                            btnText={'RESET PASSWORD'}
                                            width={wp("12%")}
                                            borderColor={COLORS.app_theme_color}
                                            borderRadius={wp(8)}
                                            verticalPaddingWithText={2}
                                            textColor={COLORS.app_theme_color}
                                            color={'#FFFFFF'}
                                        />
                                    </View>
                                    <Spacer space={wp("2%")}/>
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

const mapDispatchToProps = (dispatch) => {
    return {
        loginApi: (payload) => dispatch(LoginAction(payload)),
    };
};

// ----------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

