import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {ConfirmUserAction} from '../../../redux/actions/ConfirmUserAction';
import STRINGS from '../../../utils/Strings';
import {ResendAction} from '../../../redux/actions/ResendAction';
import {MYTOAST} from '../../../components/Toast';
import OrientationLoadingOverlay from '../../../utils/CustomLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';
import AppConstant from '../../../utils/constants';

export default function Otp(props) {
    const {navigation} = props;

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');
    const [pin3, setPin3] = useState('');
    const [pin4, setPin4] = useState('');
    const [pin5, setPin5] = useState('');
    const [pin6, setPin6] = useState('');
    const [time, setTime] = useState(60);
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [confirmationCode, setconfirmationCode] = useState('');
    const [username, setusername] = useState(props.route.params.userName);
    const [password, setpassword] = useState(props.route.params.userPassword);

    const [isLoading, setisLoading] = useState(false);

    // console.warn("eeeee-->",username)

    useEffect(() => {
        if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000);
        }
    });

    const onResendClick = () => {
        setisLoading(true);

        ResendAction(
            {
                username: username,
                //phone_number: phone_number,
                // deviceToken: fcmToken,
            },
            data => resendOtpResponse(data),
        );
        setTime(60);
    };

    const resendOtpResponse = response => {
        const {navigate} = navigation;
        console.warn('ResendOtp-->', response.message);
        setisLoading(false);
        if (response !== 'Network Error') {
            const {code, message, data} = response;
            //     console.warn('ResendOTPResp-->', message);

            if (code == '200') {
                MYTOAST('OTP has been sent on your mobile number.');
                //  navigate('Tabs');
            } else if (code == '500') {
                MYTOAST(response.message);
            } else if (code == '400') {
                MYTOAST(response.data);
            }
        } else {
            // hideDialog();
            MYTOAST(STRINGS.CHECK_INTERNET);
        }
    };

    const continueClick = () => {
        setisLoading(true);
        // console.warn("checkToken", fcmToken)
        ConfirmUserAction(
            {
                //  email: email,
                confirmationCode: code,
                username: username,
                password: password,
                // deviceToken: fcmToken,
            },
            data => handleconfirmResponse(data),
        );
    };

    const handleconfirmResponse = response => {
        setisLoading(false);

        const {navigate} = navigation;
        if (response !== 'Network Error') {
            const {code, message, data} = response;
            // console.warn('ResendOTPResp-->', message);
            if (code == '200') {

                // MYTOAST('Successfully Signup.');
                AsyncStorage.setItem('loginToken', response.access_token);
                AsyncStorage.setItem('userDetail', JSON.stringify(response.document));
                AsyncStorage.setItem('loginUserId', response.document._id);
                AppConstant.shared.globalStoredUserInfo = response.document;
                //  console.warn('Raju++ ', response);

                //   return false;
                //   navigation.navigate('onboarding');

                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'onboarding',
                                params: {data: {edit: false}}, // if you want to send data to home screen
                            },
                        ],
                    }),
                );

                // navigate();
            } else if (code == '500') {
                MYTOAST(response.message);
                return false;
            } else if (code == '400') {
                MYTOAST(response.data);
                return false;
            }
        } else {
            // hideDialog();
            MYTOAST(STRINGS.CHECK_INTERNET);
        }
    };

    return (
        <>
            <View style={Styles.mainContainer1}>
                <View>
                    <Spacer space={1}/>
                    <TopHeader onPressBackArrow={() => navigation.goBack()}/>
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
                    <Spacer space={3}/>

                    <Text
                        style={{
                            fontSize: FONT.TextMedium_2,
                            color: '#ffffff',
                            textAlign: 'center',
                            fontFamily: FONT_FAMILY.BentonSansMedium,
                        }}>
                        {' '}
                        ENTER OTP
                    </Text>
                    <Spacer space={2}/>
                    <View
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                width: wp('90%'),
                                fontSize: FONT.TextExtraSmall,
                                color: '#ffffff',
                                textAlign: 'center',
                                fontFamily: FONT_FAMILY.BentonSansMedium,
                            }}>
                            We have sent an OTP to the entered mobile number.
                        </Text>
                    </View>
                </View>
                <Spacer space={3}/>
                <View style={{alignItems: 'center'}}>
                    <OTPInputView
                        style={{
                            width: wp('90%'),
                            height: hp('15%'),
                            //   backgroundColor: "pink"
                        }}
                        pinCount={6}
                        code={code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
                        onCodeChanged={cd => setCode(cd)}
                        // autoFocusOnLoad
                        codeInputFieldStyle={{
                            width: wp("8%"),
                            //   backgroundColor: "green",
                            height: hp("7%"),
                            borderWidth: 0,
                            borderColor: COLORS.white_color,
                            borderBottomWidth: 3,
                            color: COLORS.white_color,
                            fontSize: FONT.TextNormal_2,
                            fontFamily: FONT_FAMILY.MontserratRegular,
                        }}
                        codeInputHighlightStyle={{
                            borderColor: COLORS.white_color,
                            //    height: hp('5%'),
                            // textColor: 'green',
                        }}
                        editable={true}
                        onCodeFilled={code => {
                            console.log(`Code is ${code}, you are good to go!`);
                        }}
                    />
                    {/*<OtpInput*/}
                    {/*    label='OTP'*/}
                    {/*    input_back={COLORS.input_back}*/}
                    {/*    value={pin1}*/}
                    {/*    onChangeText={(txt) => setPin1(txt)}*/}
                    {/*    autofocus={true}*/}
                    {/*    keyboardType={'numeric'}*/}
                    {/*/>*/}
                </View>
                <Spacer space={3}/>

                {time > 0 && (
                    <Text
                        style={{
                            fontSize: FONT.TextMedium_2,
                            color: '#ffffff',
                            textAlign: 'center',
                            fontFamily: FONT_FAMILY.BentonSansMedium,

                            //margin: 10
                        }}>
                        {time}
                    </Text>
                )}

                <Spacer space={7}/>

                <Text
                    style={{
                        fontSize: FONT.TextSmall,
                        color: '#ffffff',
                        textAlign: 'center',
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                    }}>
                    {' '}
                    Didn't receive the OTP?{' '}
                    <Text
                        onPress={() => {
                            if (time > 0) {
                            } else {
                                onResendClick();
                            }
                        }}
                        style={{
                            color: time > 0 ? 'rgba(255,255,255,0.4)' : '#ffffff',
                            fontSize: FONT.TextSmall,
                            textAlign: 'center',
                            fontFamily: FONT_FAMILY.BentonSansMedium,
                            textDecorationLine: 'underline',
                            textDecorationStyle: 'solid',
                        }}>
                        Resend
                    </Text>
                </Text>

                <Spacer space={4}/>

                <View style={{alignItems: 'center'}}>
                    <NewPrimaryButton
                        onPress={() => continueClick()}
                        // onPress={() => navigation.navigate('onboarding')}
                        fontFamily={FONT_FAMILY.BentonSansMedium}
                        btnText={'CONTINUE'}
                        width={wp(8)}
                        // borderColor={COLORS.blue_color}
                        borderRadius={wp(5)}
                        verticalPaddingWithText={2}
                        textColor={COLORS.app_theme_color}
                        color={'#FFFFFF'}
                    />
                    <Spacer space={7}/>
                </View>
            </View>
            <OrientationLoadingOverlay
                visible={isLoading}
                message={STRINGS.LOADING_TEXT}
            />
        </>
    );
}
