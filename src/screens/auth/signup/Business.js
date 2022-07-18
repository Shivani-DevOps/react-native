import React, {useEffect, useRef, useState} from 'react';
import {Image, View,} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import CustomInput from '../../../components/textInput/CustomInput';
import {FONT_FAMILY} from '../../../utils/Font';
import PhoneInput from 'react-native-phone-number-input';
import {MYTOAST} from '../../../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

var BusinessNamevalue =
    AsyncStorage.getItem('businessName') !== null
        ? AsyncStorage.getItem('businessName')
        : null;
var ConactNamevalue =
    AsyncStorage.getItem('contactName') !== null
        ? AsyncStorage.getItem('contactName')
        : null;
var BusinessPhoneValue =
    AsyncStorage.getItem('businessPhoneNumber') !== null
        ? AsyncStorage.getItem('businessPhoneNumber')
        : null;

export default function Business({route, navigation}) {
    const [businessName, setBusinessName] = useState('');
    const [contactName, setContactName] = useState('');
    const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');

    const {actype} = route.params;
    const phoneNo = /^(?:[0-9] ?){7,12}[0-9]$/;

    useEffect(() => {
        getAllData();
    }, []);

    const storeBusinessName = async value => {
        try {
            setBusinessName(value);
            await AsyncStorage.setItem('businessName', value);
        } catch (e) {
            // saving error
        }
    };

    const storeContactName = async value => {
        try {
            setContactName(value);
            await AsyncStorage.setItem('contactName', value);
        } catch (e) {
            // saving error
        }
    };

    const storeBusinessPhoneData = async value => {
        try {
            setBusinessPhoneNumber(value);
            console.log('storing', value);
            await AsyncStorage.setItem('businessPhoneNumber', value);
        } catch (e) {
            // saving error
        }
    };

    const getAllData = async () => {
        try {
            BusinessNamevalue = await AsyncStorage.getItem('businessName');
            if (BusinessNamevalue !== null) {
                setBusinessName(BusinessNamevalue);
            }

            ConactNamevalue = await AsyncStorage.getItem('contactName');
            if (ConactNamevalue !== null) {
                setContactName(ConactNamevalue);
            }

            BusinessPhoneValue = await AsyncStorage.getItem('businessPhoneNumber');
            if (BusinessPhoneValue !== null) {
                setBusinessPhoneNumber(BusinessPhoneValue);
            }
        } catch (e) {
            // error reading value
        }
    };

    const Validate = () => {
        if (businessName === undefined || businessName.trim().length === 0) {
            MYTOAST('Please enter business name.');
            return;
        } else if (contactName === undefined || contactName.trim().length === 0) {
            MYTOAST('Please enter contact name.');
            return;
        } else if (businessPhoneNumber.length == 0) {
            MYTOAST('Please enter contact business phone number.');
            return;
        } else if (businessPhoneNumber.length < 10) {
            MYTOAST('Please Enter User Valid Phone Number');
            return false;
        }

            // else if (!phoneNo.test(businessPhoneNumber.slice(3))) {
            //     console.log('slice', businessPhoneNumber.slice(3));
            //     MYTOAST("Please Enter User Valid Phone Number")
            //     return false;
        // }
        else {
            navigation.navigate('businesssignup', {
                actype: actype,
                seekerName: businessName,
                contactName: contactName,
                businessPhoneNumber: businessPhoneNumber,
            });
        }
    };
    const phoneInput = useRef(null);

    return (
        <>
            <View style={Styles.mainContainer2}>
                <View>
                    <Spacer space={1}/>
                    <TopHeader
                        onPressBackArrow={() => navigation.goBack()}
                        backgroundColor={COLORS.blue_color}
                    />
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
                <Spacer space={wp('0%')}/>
                <View style={{alignItems: 'center', marginBottom: '55%'}}>
                    <CustomInput
                        label="Business Name"
                        backgroundColor={COLORS.blue_color}
                        value={businessName}
                        onChangeText={txt => storeBusinessName(txt)}
                        autofocus={true}
                        maxLength={30}
                        input_back={COLORS.input_back1}
                        // keyboardType='alpha-numeric'
                    />

                    <CustomInput
                        label="Contact Name"
                        backgroundColor={COLORS.blue_color}
                        value={contactName}
                        onChangeText={txt => storeContactName(txt)}
                        autofocus={true}
                        maxLength={30}
                        input_back={COLORS.input_back1}
                        // keyboardType='alpha-numeric'
                    />
                    {/*{console.warn(businessPhoneNumber)}*/}

                    <PhoneInput
                        ref={phoneInput}
                        defaultValue={businessPhoneNumber}
                        value={businessPhoneNumber}
                        defaultCode="IN"
                        layout="first"
                        textInputProps={{placeholderTextColor: COLORS.white_color}}
                        maxLength={3}
                        containerStyle={{
                            justifyContent: 'center',
                            width: wp('90%'),
                            height: wp('12%'),
                            borderRadius: wp('10%'),
                            backgroundColor: '#84C6BE',
                            borderColor: COLORS.white_color,
                            borderWidth: 1,
                            zIndex: 0,
                            marginTop: 15,
                            marginBottom: 10,
                            color: COLORS.white_color,
                        }}
                        codeTextStyle={{
                            color: COLORS.white_color,
                        }}
                        textInputStyle={{
                            color: COLORS.white_color,
                        }}
                        textContainerStyle={{
                            textAlign: 'center',
                            justifyContent: 'center',
                            alignItems: 'center',
                            paddingVertical: 0,
                            borderRadius: wp('10%'),
                            backgroundColor: '#84C6BE',
                            color: COLORS.white_color,
                        }}
                        onChangeFormattedText={txt => storeBusinessPhoneData(txt)}
                        // onChangeFormattedText={(txt) => setbusinessPhoneNumber(txt)}
                    />
                </View>
                {/* <Spacer space={wp("5%")}/> */}

                <View style={{alignItems: 'center', marginTop: -60}}>
                    <NewPrimaryButton
                        onPress={() => Validate()}
                        fontFamily={FONT_FAMILY.BentonSansBold}
                        btnText={'NEXT'}
                        width={wp(6)}
                        borderColor={COLORS.blue_color}
                        borderRadius={wp(8)}
                        verticalPaddingWithText={wp('0.6%')}
                        textColor={COLORS.blue_color}
                        color={'#FFFFFF'}
                    />
                    <Spacer space={10}/>
                </View>
            </View>
        </>
    );
}
