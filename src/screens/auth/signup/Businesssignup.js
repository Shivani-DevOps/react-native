import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View,} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import BottomSheet from 'reanimated-bottom-sheet';
// import { SignupAction } from '../../../redux/actions/BusinessSignupAction';
import CustomInput from '../../../components/textInput/CustomInput';
//import { CustomDatePicker } from '../../../components/DateTimePicker/DatePicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import {BusinessSignupAction} from '../../../redux/actions/BusinessSignupAction';
import STRINGS from '../../../utils/Strings';
import OrientationLoadingOverlay from '../../../utils/CustomLoader';
import {MYTOAST} from '../../../components/Toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LANGUAGES = ['Arabic', 'English', 'French', 'Hindi', 'Spanish', 'Russia'];
const PROFESSION = ['Software Engineer', 'Actor', 'Army', 'Doctor'];
const INDUSTRY = ['Information Technology', 'Real Estate', 'Banking'];

var BusinessEmailvalue =
    AsyncStorage.getItem('businessemail') !== null
        ? AsyncStorage.getItem('businessemail')
        : null;
var BusinessUserNamevalue =
    AsyncStorage.getItem('businessuserName') !== null
        ? AsyncStorage.getItem('businessuserName')
        : null;
var Businesspasswordvalue =
    AsyncStorage.getItem('businesspassword') !== null
        ? AsyncStorage.getItem('businesspassword')
        : null;
var Businesslangvalue =
    AsyncStorage.getItem('Businesslanguage') !== null
        ? AsyncStorage.getItem('Businesslanguage')
        : null;
var Industryvalue =
    AsyncStorage.getItem('IndustryType') !== null
        ? AsyncStorage.getItem('IndustryType')
        : null;
var Professionvalue =
    AsyncStorage.getItem('ProfessionType') !== null
        ? AsyncStorage.getItem('ProfessionType')
        : null;

export default function BusinessSignup({route, navigation}) {
    //const [email, setEmail] = useState(BusinessEmailvalue);
    const [email, setEmail] = useState('');

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [profession, setProfession] = useState([]);
    const [professionData, setProfessionData] = useState([]);
    const [professionFilterData, setProfessionFilterData] = useState([]);
    const [profilestate, setProfileState] = useState(false);

    const [industry, setIndustry] = useState('');
    const [indusrtyData, setIndustryData] = useState([]);
    const [industryFilterData, setIndustryFilterData] = useState([]);
    const [industrystate, setIndustryState] = useState(false);

    const [contents, setContent] = useState('');

    const [lang, setLang] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [pro, setPro] = useState('');
    const [indu, setIndu] = useState('');

    const {actype, seekerName, businessPhoneNumber, contactName} = route.params;

    // fetching data
    useEffect(() => {
        GetProfessionData();
        GetIndustryData();
        GetContent();
        getAllData();
    }, []);

    const storeBusinessEmail = async value => {
        try {
            setEmail(value);
            await AsyncStorage.setItem('businessemail', value);
        } catch (e) {
            // saving error
        }
    };

    const storeBusinessName = async value => {
        try {
            setUserName(value);
            await AsyncStorage.setItem('businessuserName', value);
        } catch (e) {
            // saving error
        }
    };

    const storeBusinessPassword = async value => {
        try {
            setPassword(value);
            await AsyncStorage.setItem('businesspassword', value);
        } catch (e) {
            // saving error
        }
    };

    const storelangData = async value => {
        try {
            setLang(value);
            await AsyncStorage.setItem('Businesslanguage', value);
        } catch (e) {
            // saving error
        }
    };

    const storeindustryData = async value => {
        try {
            setIndustry(value);
            await AsyncStorage.setItem('IndustryType', value);
        } catch (e) {
            // saving error
        }
    };
    const storeprofessionData = async value => {

        try {
            let tempArray = profession;

            if (tempArray.includes(value)) {
                let ind = tempArray.indexOf(value);
                tempArray.splice(ind, 1);
                tempArray = [...tempArray]
                setProfession(tempArray);

            } else if (profession.length < 2) {
                tempArray = [...tempArray, value]
                setProfession(tempArray);
            } else if (profession.length == 2) {
                tempArray.pop();
                tempArray = [...tempArray, value]
                setProfession(tempArray);
            }

            await AsyncStorage.setItem('ProfessionType', tempArray.join(","));
        } catch (e) {
            // saving error
        }


    };

    const getAllData = async () => {
        try {
            BusinessEmailvalue = await AsyncStorage.getItem('businessemail');
            if (BusinessEmailvalue !== null) {
                setEmail(BusinessEmailvalue);
            }

            BusinessUserNamevalue = await AsyncStorage.getItem('businessuserName');
            if (BusinessUserNamevalue !== null) {
                setUserName(BusinessUserNamevalue);
            }

            Businesspasswordvalue = await AsyncStorage.getItem('businesspassword');
            if (Businesspasswordvalue !== null) {
                setPassword(Businesspasswordvalue);
            }

            Businesslangvalue = await AsyncStorage.getItem('Businesslanguage');
            if (Businesslangvalue !== null) {
                setLang(Businesslangvalue);
            }
            Industryvalue = await AsyncStorage.getItem('IndustryType');
            if (Industryvalue !== null) {
                setIndustry(Industryvalue);
            }
            Professionvalue = await AsyncStorage.getItem('ProfessionType');
            if (Professionvalue !== null) {
                setProfession(Professionvalue.split(","));
            }
        } catch (e) {
            // error reading value
        }
    };

    const GetContent = () => {
        axios
            .get('https://devuser.sparkseekerapi.com/contents')
            .then(response => setContent(response.data))
            .catch(e => console.log('error', e));
    };

    const GetProfessionData = () => {

        axios
            .get('https://devuser.sparkseekerapi.com/professions')
            .then(response => setProfessionData(response.data))
            .catch(e => console.log('error', e));
    };

    const GetIndustryData = () => {
        axios
            .get('https://devuser.sparkseekerapi.com/industries')
            .then(response => setIndustryData(response.data))
            .catch(e => console.log('error', e));
    };

    const handleSignupResponse = response => {
        //  console.warn('SignupResponse-->', response);
        setisLoading(false);

        if (response.message !== 'Network Error') {
            const {code, message, data} = response;

            if (code === '200') {
                RemoveSessionData();
            } else if (code === '409') {
                MYTOAST(response.message);
            } else if (code === '422') {
                MYTOAST(response.message);
            } else {
                MYTOAST(response.message);
            }
        } else {
            MYTOAST(STRINGS.CHECK_INTERNET);
        }
    };

    const RemoveSessionData = async () => {
        try {
            await AsyncStorage.removeItem('businessName');
            await AsyncStorage.removeItem('contactName');
            await AsyncStorage.removeItem('businessPhoneNumber');
            await AsyncStorage.removeItem('businessemail');
            await AsyncStorage.removeItem('businessuserName');
            await AsyncStorage.removeItem('businesspassword');
            await AsyncStorage.removeItem('Businesslanguage');
            await AsyncStorage.removeItem('IndustryType');
            await AsyncStorage.removeItem('ProfessionType');
        } catch (e) {
            // remove error
        }

        // console.log('Done.')
        // MYTOAST(STRINGS.SIGNUP_SUCCESS)
        navigation.navigate('otp1', {userName, password});
    };
    const reg =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
    const passregx =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    const phoneNo = /^(?:[0-9] ?){7,12}[0-9]$/;
    const namereg = /^[A-Za-z0-9_-]*$/;

    const Validate = () => {
        if (email === undefined || email.trim().length === 0) {
            MYTOAST('Email field should not be Empty.');
            // alert("Email / Mobile is Not Correct");
            return false;
        } else if (!reg.test(email)) {
            MYTOAST('Please enter the valid Email.');
            return false;
        } else if (userName === undefined || userName.trim().length === 0) {
            MYTOAST('Please enter User Name');
            return false;
        } else if (password === undefined || password.trim().length === 0) {
            MYTOAST('Please enter the Password');
            return false;
        } else if (!passregx.test(password)) {
            MYTOAST(
                'Password should be strong! Min 8 characters required including 1 upper/lowercase, 1 special & 1 numeric character.',
            );
            return false;
        } else if (profession.length == 0) {
            MYTOAST('Select your profession');
            return;
        } else if (industry.length == 0) {
            MYTOAST('Select your industry');
            return;
        } else if (lang.length == 0) {
            MYTOAST('Select your Language');
            return;
        } else {
            // alert('hi')
            // return
            SignupClick();
        }
    };
    const SignupClick = async () => {
        setisLoading(true);
        // console.warn("checkToken", fcmToken)

        BusinessSignupAction(
            {
                actype:
                    actype === '1'
                        ? 'individualPersonal'
                        : actype === '2'
                            ? 'individualProfessional'
                            : actype === '3'
                                ? 'Business'
                                : actype === '4'
                                    ? 'nonProfit'
                                    : null,
                seekerName: seekerName,
                userEmail: email,
                userPassword: password,
                userName: userName,
                contactName: contactName,
                lang: lang,
                dateofBirth: '09/12/1996',
                phone_number: businessPhoneNumber,
                profession: profession,
                industry: industry,
            },
            data => handleSignupResponse(data),
        );
    };

    const renderContent = () => (
        <View
            style={{
                backgroundColor: '#fff',
                height: hp('45%'),
                width: wp('100%'),
            }}>
            <Spacer space={"2%"}/>

            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: wp('6%'),
                }}>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextSmall_2,

                    }}>
                    SELECT LANGUAGE
                </Text>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansBold,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.blue_color,
                    }}
                    onPress={() => sheetRef.current.snapTo(0)}>
                    Done
                </Text>
            </View>
            <View
                style={{
                    height: hp('25%'),
                    width: wp("95%"),
                    //  padding: wp('7%'),
                    paddingHorizontal: wp("5%"),
                    justifyContent: 'space-between',
                }}>
                {LANGUAGES.map(item => (
                    <TouchableWithoutFeedback
                        onPress={() => storelangData(item)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                //   backgroundColor: "red"
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansBook,
                                    fontSize: FONT.TextSmall_2,
                                    margin: 7,
                                    color: lang === item ? COLORS.blue_color : COLORS.black_color,
                                }}
                                //  onPress={() => storelangData(item)}
                            >
                                {item}
                            </Text>
                            {lang === item ? (
                                <AntDesign name="check" size={20} color={COLORS.blue_color}/>
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>

                ))}
            </View>
        </View>
    );

    const renderContentTerms = () => (
        <View
            style={{
                backgroundColor: '#fff',
            }}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: 30,
                }}>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextMedium,
                    }}>
                    Terms of Use
                </Text>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.blue_color,
                    }}
                    onPress={() => sheetRef1.current.snapTo(0)}>
                    Done
                </Text>
            </View>
            <View style={{margin: 10}}>
                {contents !== ''
                    ? contents.map((item, index) => (
                        <View>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.MontserratRegular,
                                    fontSize: FONT.TextMedium_2,
                                    width: wp('80%'),
                                    alignSelf: 'center',
                                }}>
                                {item.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.MontserratRegular,
                                    fontSize: FONT.TextSmall_2,
                                    width: wp('80%'),
                                    alignSelf: 'center',
                                }}>
                                {item.description}
                            </Text>
                        </View>
                    ))
                    : null}

                {/* <FlatList
                    data={contents}
                    renderItem={({item}) =>
                        <View>
                            <Text style={{
                                fontFamily: FONT_FAMILY.MontserratRegular,
                                fontSize: FONT.TextMedium_2, width: wp('80%'), alignSelf: 'center'
                            }}>
                                {item.name}
                            </Text>
                            <Text style={{
                                fontFamily: FONT_FAMILY.MontserratRegular,
                                fontSize: FONT.TextSmall_2, width: wp('80%'), alignSelf: 'center'
                            }}>
                                {item.description}
                            </Text>
                        </View>
                        }
                    keyExtractor={item => item._id}


                /> */}
            </View>
        </View>
    );

    //Set Profession fun

    // const ProfessionsFun = (item) => {
    //     let p = [];
    //     let D = p.push(item.name);
    //     setProfession(item.name)

    //     console.log('DDDD', D, item.name);

    // }

    // Profession
    const renderContentProfession = () => (
        <View
            style={{
                backgroundColor: '#fff',
                height: hp('45%'),
                width: wp('100%'),
            }}>
            <Spacer space={"2%"}/>

            <View
                style={{
                    //backgroundColor: "red",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: wp('6%'),
                }}>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextSmall_2,
                    }}>
                    SELECT PROFESSION
                </Text>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansBold,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.blue_color,
                    }}
                    onPress={() => sheetRef2.current.snapTo(0)}>
                    Done
                </Text>
            </View>
            <View
                style={{
                    height: hp('30%'),
                    width: wp("95%"),
                    //  padding: wp('7%'),
                    paddingHorizontal: wp("5%"),
                    justifyContent: 'space-between',
                    //  backgroundColor: "red",

                }}>
                {professionData.map(item => (
                    <TouchableWithoutFeedback
                        onPress={() => storeprofessionData(item.name)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansBook,
                                    fontSize: FONT.TextSmall_2,
                                    margin: 7,
                                    color:
                                        profession.includes(item.name)
                                            ? COLORS.blue_color
                                            : COLORS.black_color,
                                }}
                                //  onPress={() => storeprofessionData(item.name)}
                            >
                                {item.name}
                            </Text>
                            {profession.includes(item.name) ? (
                                <AntDesign
                                    name="check"
                                    size={20}
                                    color={COLORS.blue_color}
                                />
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    );
    //

    // Indestry
    const renderContentIndustry = () => (
        <View
            style={{
                backgroundColor: '#fff',
                height: hp('45%'),
                width: wp('100%'),
            }}>
            <Spacer space={"2%"}/>

            <View
                style={{
                    // backgroundColor:"red",
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: wp('6%'),
                }}>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextSmall_2,
                    }}>
                    SELECT INDUSTRY
                </Text>

                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansMedium,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.blue_color,
                    }}
                    onPress={() => sheetRef3.current.snapTo(0)}>
                    Done
                </Text>
            </View>
            <View
                style={{
                    height: hp('25%'),
                    width: wp("95%"),
                    //  padding: wp('7%'),
                    paddingHorizontal: wp("5%"),
                    justifyContent: 'space-between',
                }}>
                {indusrtyData.map(item => (
                    <TouchableWithoutFeedback
                        onPress={() => storeindustryData(item.name)}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansBook,
                                    fontSize: FONT.TextSmall_2,
                                    margin: 7,
                                    color:
                                        industry === item.name
                                            ? COLORS.blue_color
                                            : COLORS.black_color,
                                }}
                                //  onPress={() => storeindustryData(item.name)}
                            >
                                {item.name}
                            </Text>
                            {industry === item.name ? (
                                <AntDesign name="check" size={17} color={COLORS.blue_color}/>
                            ) : null}
                        </View>
                    </TouchableWithoutFeedback>
                ))}
            </View>
        </View>
    );
    //

    const sheetRef = React.useRef(null);
    const sheetRef1 = React.useRef(null);
    const sheetRef2 = React.useRef(null);
    const sheetRef3 = React.useRef(null);

    // Profession filter
    const SearchProf = txt => {
        setProfession([]);
        if (txt !== '') {
            setProfileState(true);
            let arr = [];
            professionData
                .filter(item => item.name.toLowerCase().includes(txt.toLowerCase()))
                .map(item1 => {
                    arr.push(item1);
                });
            setProfessionFilterData(arr);
        } else {
        }
    };
    // const SelectedProf = txt => {
    //     setProfession({name: txt});
    //     setProfileState(false);
    // };

    // Industry filter
    const SearchIndu = txt => {
        setIndustry('');
        if (txt !== '') {
            setIndustryState(true);
            let arr = [];
            indusrtyData
                .filter(item => item.name.toLowerCase().includes(txt.toLowerCase()))
                .map(item1 => {
                    arr.push(item1);
                });
            setIndustryFilterData(arr);
        } else {
        }
    };
    const SelectedIndu = txt => {
        setIndustry({name: txt});
        setIndustryState(false);
    };

    return (
        <ScrollView>
            <OrientationLoadingOverlay
                visible={isLoading}
                message={STRINGS.LOADING_TEXT}
            />
            <View style={Styles.mainContainer3}>
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
                    {/* <Spacer space={1} /> */}
                </View>

                {/* <Text style={Styles.txt}>Select</Text> */}
                <View style={{alignItems: 'center'}}>
                    <CustomInput
                        label="Email"
                        value={email}
                        onChangeText={txt => storeBusinessEmail(txt)}
                        input_back={COLORS.input_back1}
                    />

                    <CustomInput
                        label="User Name"
                        value={userName}
                        onChangeText={txt => storeBusinessName(txt)}
                        input_back={COLORS.input_back1}
                    />

                    <CustomInput
                        label="Password"
                        value={password}
                        onChangeText={txt => storeBusinessPassword(txt)}
                        secureTextEntry={true}
                        input_back={COLORS.input_back1}
                    />


                    <TouchableOpacity
                        style={Styles.touchable1}
                        onPress={() => sheetRef.current.snapTo(1)}
                        input_back={COLORS.input_back1}>
                        <Text style={Styles.txt}>
                            {lang ? lang : 'Preferred Subtitles'}
                            {/*{lang !== null && JSON.stringify(lang) !== `{"_U":0,"_V":1,"_W":null,"_X":null}` ? JSON.stringify(lang) : 'Preferred Subtitles'}*/}
                        </Text>
                        <AntDesign
                            style={{height: wp('6.7%'), alignSelf: 'center'}}
                            name="downcircleo"
                            size={25}
                            color={COLORS.white_color}
                        />
                    </TouchableOpacity>

                    {/* <CustomInput
                            label='Profession'
                            value={profession.name}
                            onChangeText={(txt) => SearchProf(txt)}
                            input_back={COLORS.input_back1}
                        // secureTextEntry={true}
                        />
                        {
                            profilestate ?
                                <View style={{ backgroundColor: COLORS.white_color, width: wp('90%'), padding: 10 }}>
                                    {
                                        professionFilterData.map((item) =>
                                            <Text style={{ fontSize: 18, color: item.name === profession ? COLORS.app_theme_color : COLORS.black_color }} onPress={() => SelectedProf(item.name)}>{item.name}</Text>
                                        )
                                    }
                                </View>
                                :
                                null
                        } */}
                    <TouchableOpacity
                        style={Styles.touchable1}
                        onPress={() => sheetRef2.current.snapTo(1)}
                        input_back={COLORS.input_back1}>
                        <Text style={Styles.txt}>
                            {profession.length > 0 ? profession.join(', ') : 'Profession'}
                            {console.warn("aaaaa-->", profession)}
                        </Text>
                        <AntDesign
                            style={{height: wp('7.5%'), alignSelf: 'center'}}
                            name="downcircleo"
                            size={25}
                            color={COLORS.white_color}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={Styles.touchable1}
                        onPress={() => sheetRef3.current.snapTo(1)}
                        input_back={COLORS.input_back1}>
                        <Text style={Styles.txt}>{industry ? industry : 'Industry'}</Text>
                        <AntDesign
                            style={{height: wp('7.5%'), alignSelf: 'center'}}
                            name="downcircleo"
                            size={25}
                            color={COLORS.white_color}
                        />
                    </TouchableOpacity>

                    {/* <CustomInput
                            label='Industry'
                            value={industry.name}
                            onChangeText={(txt) => SearchIndu(txt)}
                            input_back={COLORS.input_back1}
                            input_back={COLORS.input_back1}
                        // secureTextEntry={true}
                        />
                        {
                            industrystate ?
                                <View style={{ backgroundColor: COLORS.white_color, width: wp('90%'), padding: 10 }}>
                                    {
                                        industryFilterData.map((item) =>
                                            <Text style={{ fontSize: 18, color: item.name === industry ? COLORS.app_theme_color : COLORS.black_color }} onPress={() => SelectedIndu(item.name)}>{item.name}</Text>
                                        )
                                    }
                                </View>
                                :
                                null
                        } */}


                    <Spacer space={wp('0.7%')}/>

                    <TouchableWithoutFeedback onPress={() => sheetRef1.current.snapTo(1)}>

                        <Image
                            source={require('../../../assets/images/AgreeIcon.png')}
                            style={{
                                //  backgroundColor: "red",
                                height: hp("5%"),
                                alignSelf: 'center',
                                width: wp('80%'),
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableWithoutFeedback>

                    {/*<Text*/}
                    {/*    style={{*/}
                    {/*        fontSize: FONT.TextSmall_2,*/}
                    {/*        color: COLORS.white_color,*/}
                    {/*        fontFamily: FONT_FAMILY.BentonSansRegular,*/}
                    {/*        width: wp('80%'),*/}
                    {/*    }}*/}
                    {/*    onPress={() => sheetRef1.current.snapTo(1)}>*/}
                    {/*    By signing up, you agree to our*/}
                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            textDecorationStyle: 'double',*/}
                    {/*            // textDecorationColor: COLORS.white_color,*/}
                    {/*            textDecorationLine: 'underline',*/}
                    {/*            fontSize: FONT.TextSmall_2,*/}
                    {/*            color: COLORS.white_color,*/}
                    {/*            textAlign: 'center',*/}
                    {/*            fontFamily: FONT_FAMILY.BentonSansBold,*/}
                    {/*        }}>*/}
                    {/*        {' '}*/}
                    {/*        Terms, Data, Privacy and Cookie Policies.*/}
                    {/*    </Text>*/}
                    {/*</Text>*/}

                    <Spacer space={wp('1.5%')}/>
                </View>
                <View style={{alignItems: 'center'}}>
                    <NewPrimaryButton
                        onPress={() => Validate()}
                        // onPress={() => navigation.navigate('otp')}
                        fontFamily={FONT_FAMILY.BentonSansBold}
                        btnText={'SIGN UP'}
                        width={wp(6)}
                        borderColor={COLORS.blue_color}
                        borderRadius={wp(8)}
                        verticalPaddingWithText={wp('0.6%')}
                        textColor={COLORS.blue_color}
                        color={'#FFFFFF'}
                    />
                    <Spacer space={wp('4%')}/>
                </View>
            </View>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[0, hp('45%'), hp('30%'), 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
            <BottomSheet
                ref={sheetRef1}
                snapPoints={[0, hp('70%'), hp('30%'), 0]}
                borderRadius={10}
                renderContent={renderContentTerms}
            />

            <BottomSheet
                ref={sheetRef2}
                snapPoints={[0, hp('45%'), hp('30%'), 0]}
                borderRadius={20}
                renderContent={renderContentProfession}
            />

            <BottomSheet
                ref={sheetRef3}
                snapPoints={[0, hp('45%'), hp('30%'), 0]}
                borderRadius={20}
                renderContent={renderContentIndustry}
            />
        </ScrollView>
    );
}
