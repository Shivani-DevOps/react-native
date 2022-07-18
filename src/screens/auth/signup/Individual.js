import React, {useEffect, useRef, useState} from 'react';
import {Image, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import CustomInput from '../../../components/textInput/CustomInput';
// import validateEmail from '../../../utils/validations';
import {FONT_FAMILY} from '../../../utils/Font';
import {MYTOAST} from '../../../components/Toast';

import PhoneInput from 'react-native-phone-number-input';
import AsyncStorage from '@react-native-async-storage/async-storage';

var Emailvalue =
    AsyncStorage.getItem('userEmail') !== null
        ? AsyncStorage.getItem('userEmail')
        : null;
var Phonevalue =
    AsyncStorage.getItem('userPhoneNumber') !== null
        ? AsyncStorage.getItem('userPhoneNumber')
        : null;
var Namevalue =
    AsyncStorage.getItem('userName') !== null
        ? AsyncStorage.getItem('userName')
        : null;

var Passwordvalue =
    AsyncStorage.getItem('Password') !== null
        ? AsyncStorage.getItem('Password')
        : null;

export default function Individual({route, navigation}) {
    const [userName, setUserName] = useState('');

    const [userEmail, setUserEmail] = useState('');
    const [userPhoneNumber, setUserPhoneNumber] = useState('');
    const [userPassword, setUserPassword] = useState('');

    // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    const reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    const passregx =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const phoneNo = /^(?:[0-9] ?){7,12}[0-9]$/;
    const {actype} = route.params;

    useEffect(() => {
        getAllData();
    }, []);

    const Validate = () => {
        if (userEmail === undefined || userEmail.trim().length === 0) {
            MYTOAST('Email field should not be Empty.');
            // alert("Email / Mobile is Not Correct");
            return false;
        } else if (!reg.test(userEmail)) {
            MYTOAST('Please enter the valid Email.');
            return false;
        } else if (userPhoneNumber.length == 0) {
            MYTOAST('Please Enter User Phone Number');
            return false;
        } else if (!phoneNo.test(userPhoneNumber.slice(3))) {
            //console.log('slice', userPhoneNumber.slice(3));
            MYTOAST('Please Enter User Valid Phone Number');
            return false;
        } else if (userName === undefined || userName.trim().length === 0) {
            MYTOAST('Please enter User Name');
            return false;
        } else if (userPassword === undefined || userPassword.trim().length === 0) {
            MYTOAST('Please enter the Password');
            return false;
        } else if (!passregx.test(userPassword)) {
            MYTOAST(
                'Password should be strong! Min 8 characters required including 1 upper/lowercase, 1 special & 1 numeric character.',
            );
            return false;
        } else {
            navigation.navigate('individualsignup', {
                actype: actype,
                userName: userName,
                userEmail: userEmail,
                userPhoneNumber: userPhoneNumber,
                userPassword: userPassword,
            });
        }
    };
    const phoneInput = useRef(null);

    const storeEmailData = async value => {
        try {
            setUserEmail(value);
            await AsyncStorage.setItem('userEmail', value);
        } catch (e) {
            // saving error
        }
    };
    const storePhoneData = async value => {
        try {
            setUserPhoneNumber(value);
            // console.log(value);
            await AsyncStorage.setItem('userPhoneNumber', value);
        } catch (e) {
            // saving error
        }
    };


    const storeNameData = async value => {
        try {
            setUserName(value);
            await AsyncStorage.setItem('userName', value);
        } catch (e) {
            // saving error
        }
    };

    const storePasswordData = async value => {
        try {
            setUserPassword(value);
            await AsyncStorage.setItem('Password', value);
        } catch (e) {
            // saving error
        }
    };

    const getAllData = async () => {
        try {
            Emailvalue = await AsyncStorage.getItem('userEmail');
            if (Emailvalue !== null) {
                setUserEmail(Emailvalue);
            }

            Phonevalue = await AsyncStorage.getItem('userPhoneNumber');
            if (Phonevalue !== null) {
                setUserPhoneNumber(Phonevalue);
            }


            Namevalue = await AsyncStorage.getItem('userName');
            if (Namevalue !== null) {
                setUserName(Namevalue);
            }


            Passwordvalue = await AsyncStorage.getItem('Password');
            if (Passwordvalue !== null) {
                setUserPassword(Passwordvalue);
            }
        } catch (e) {
            // error reading value
        }
    };

    return (
        <>
            <View style={Styles.mainContainer}>
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
                </View>
                {/* <Spacer space={wp("1%")} /> */}

                <View style={{alignItems: 'center', marginTop: 28}}>
                    <CustomInput
                        label="Email"
                        value={userEmail}
                        onChangeText={txt => storeEmailData(txt)}
                        autofocus={true}
                        maxLength={50}
                        keyboardType="email-address"
                        input_back={COLORS.input_back}
                        returnKeyType={'next'}
                    />

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={userPhoneNumber}
                        value={userPhoneNumber}
                        defaultCode="IN"
                        layout="first"
                        textInputProps={{placeholderTextColor: COLORS.white_color}}
                        codeTextStyle={{
                            color: COLORS.white_color,
                        }}
                        containerStyle={{
                            width: wp('90%'),
                            height: wp('11%'),
                            borderRadius: wp('10%'),
                            backgroundColor: '#FFD130',
                            borderColor: COLORS.white_color,
                            borderWidth: 1,
                            zIndex: 0,
                            marginTop: 15,
                            marginBottom: 10,
                            color: COLORS.white_color,
                        }}
                        textInputStyle={{
                            color: COLORS.white_color,
                        }}
                        textContainerStyle={{
                            paddingVertical: 0,
                            borderRadius: wp('10%'),
                            backgroundColor: '#FFD130',
                            color: COLORS.white_color,
                        }}
                        //withShadow
                        // withDarkTheme
                        // withShadow
                        // autoFocus
                        // onChangeText={(txt) => storePhoneData(txt)}
                        onChangeFormattedText={txt => storePhoneData(txt)}
                    />
                    <CustomInput
                        label="User Name"
                        value={userName}
                        onChangeText={txt => storeNameData(txt)}
                        autofocus={true}
                        maxLength={30}
                        input_back={COLORS.input_back}
                        returnKeyType={'next'}

                        // keyboardType='alpha-numeric'
                    />

                    <CustomInput
                        label="Password"
                        value={userPassword}
                        onChangeText={txt => storePasswordData(txt)}
                        secureTextEntry={true}
                        input_back={COLORS.input_back}
                        returnKeyType={'done'}
                    />
                </View>
                <Spacer space={wp('3.5%')}/>

                <View style={{alignItems: 'center'}}>
                    <NewPrimaryButton
                        onPress={() => Validate()}
                        fontFamily={FONT_FAMILY.BentonSansBold}
                        btnText={'NEXT'}
                        width={wp(7)}
                        borderColor={COLORS.app_theme_color}
                        borderRadius={wp(8)}
                        verticalPaddingWithText={wp('0.6%')}
                        textColor={COLORS.app_theme_color}
                        color={'#FFFFFF'}
                    />
                    {/*<Spacer space={20} />*/}
                </View>
            </View>
        </>
    );
}
