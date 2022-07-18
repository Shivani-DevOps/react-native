import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import BottomSheet from 'reanimated-bottom-sheet';
import CustomInput from '../../../components/textInput/CustomInput';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import {SignupAction} from '../../../redux/actions/SignupAction';
import STRINGS from '../../../utils/Strings';
import OrientationLoadingOverlay from '../../../utils/CustomLoader';
import {MYTOAST} from '../../../components/Toast';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";


const LANGUAGES = ['Arabic', 'English', 'French', 'Hindi', 'Spanish', 'Russia'];

// const PROFESSION = ['Software Engineer', 'Actor', 'Army', 'Doctor']

var Namevalue =
    AsyncStorage.getItem('seekerName') !== null
        ? AsyncStorage.getItem('seekerName')
        : null;
var langvalue =
    AsyncStorage.getItem('language') !== null
        ? AsyncStorage.getItem('language')
        : null;
// var Passwordvalue = AsyncStorage.getItem('Password') !== null ? AsyncStorage.getItem('Password') : null;
var Professionvalue =
    AsyncStorage.getItem('ProfessionType') !== null
        ? AsyncStorage.getItem('ProfessionType')
        : null;
var Datevalue =
    AsyncStorage.getItem('DateType') !== null
        ? AsyncStorage.getItem('DateType')
        : null;

export default function IndividualSignup({route, navigation}) {
    const [seekerName, setSeekerName] = useState('');


    // const [profession, setProfession] = useState({ selected: '', name: '' });
    const [profession, setProfession] = useState([]);
    const [professionData, setProfessionData] = useState([]);
    const [professionFilterData, setProfessionFilterData] = useState([]);
    const [profilestate, setProfileState] = useState(false);

    const [contents, setContent] = useState();

    const [lang, setLang] = useState('');
    const [isLoading, setisLoading] = useState(false);
    const [pro, setPro] = useState('Profession');
    const [selected, setSelected] = useState('');
    const [show, setShow] = useState(false);
    const [date, setDate] = useState('');

    const {actype, userName, userEmail, userPassword, userPhoneNumber} = route.params;

    // fetching data
    useEffect(() => {
        GetProfessionData();
        GetContent();
        getAllData();
    }, []);

    // const onChange = (event, selectedDate) => {
    //   const currentDate = selectedDate || date;
    //   setShow(Platform.OS === 'ios');
    //   setSelected(currentDate);
    // };


    const hideDatePicker = () => {
        setShow(false)
    }

    const confirmDatePicker = (date) => {
        console.log("datepicker", date)
        setShow(false)
        setSelected(date);
    }

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

    const handleSignupResponse = response => {
        console.warn('SignupResponse-->', response);
        setisLoading(false);
        if (response.message !== 'Network Error') {
            const {code, message, data} = response;

            if (code === '200') {
                RemoveSessionData();

                //  MYTOAST(message);
            } else if (code === '409') {
                MYTOAST(response.message);
            } else if (code === '422') {
                MYTOAST(message);
            } else {
                MYTOAST(message);
            }
        } else {
            MYTOAST(STRINGS.CHECK_INTERNET);
        }
    };

    const RemoveSessionData = async () => {
        try {
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('language');
            await AsyncStorage.removeItem('userEmail');
            await AsyncStorage.removeItem('userPhoneNumber');
            await AsyncStorage.removeItem('seekerName');
            await AsyncStorage.removeItem('Password');
            await AsyncStorage.removeItem('ProfessionType');
            await AsyncStorage.removeItem('DateType');
        } catch (e) {
            // remove error
        }

        // console.log('Done.')
        //   MYTOAST(STRINGS.SIGNUP_SUCCESS)
        navigation.navigate('otp', {userName, userPassword});
    };

    const namereg = /^[A-Za-z0-9_-]*$/;
    const Validate = () => {
        if (seekerName === undefined || seekerName.trim().length === 0) {
            MYTOAST('Please Enter Full Name');
            return false;
        } else if (profession.length == 0) {
            MYTOAST('Select your profession');
            return;
        } else if (date === undefined) {
            MYTOAST('Select your D.O.b');
            return;
        } else if (lang.length == 0) {
            MYTOAST('Select your Language');
            return;
        } else {
            SignupClick();
        }
    };

    const SignupClick = async () => {
        setisLoading(true);
        SignupAction(
            {
                actype:
                    actype === '1'
                        ? 'individualPersonal'
                        : actype === '2'
                            ? 'individualProfessional'
                            : actype === '3'
                                ? 'business'
                                : actype === '4'
                                    ? 'nonProfit '
                                    : null,
                seekerName: seekerName,
                userEmail: userEmail,
                userPassword: userPassword,
                userName: userName,
                lang: lang,
                dateofBirth: moment(selected).format('DD/MM/YYYY'),
                phone_number: userPhoneNumber,
                profession: profession,
            },
            data => handleSignupResponse(data),
        );
    };

    const storeNameData = async value => {
        try {
            setSeekerName(value);
            await AsyncStorage.setItem('seekerName', value);
        } catch (e) {
            // saving error
        }
    };

    const storelangData = async value => {
        try {
            setLang(value);
            await AsyncStorage.setItem('language', value);
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

    const storedateData = async value => {
        try {
            setDate(value);
            await AsyncStorage.setItem('DateType', value);
        } catch (e) {
            // saving error
        }
    };

    const getAllData = async () => {
        try {
            Namevalue = await AsyncStorage.getItem('seekerName');
            if (Namevalue !== null) {
                setSeekerName(Namevalue);
            }

            langvalue = await AsyncStorage.getItem('language');
            if (langvalue !== null) {
                setLang(langvalue);
            }

            Professionvalue = await AsyncStorage.getItem('ProfessionType');
            if (Professionvalue !== null) {
                setProfession(Professionvalue.split(","));
            }

            Datevalue = await AsyncStorage.getItem('DateType');
            if (Datevalue !== null) {
                setDate(Datevalue);
            }
        } catch (e) {
            // error reading value
        }
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
                    SELECT LANGUAGE
                </Text>

                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansBold,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.app_theme_color,
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
                    //  backgroundColor: "red"

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
                                    color:
                                        lang === item ? COLORS.app_theme_color : COLORS.black_color,
                                }}
                            >
                                {item}
                            </Text>
                            {lang === item ? (
                                <AntDesign
                                    name="check"
                                    size={17}
                                    color={COLORS.app_theme_color}
                                />
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
                        fontFamily: FONT_FAMILY.BentonSansBold,
                        fontSize: FONT.TextMedium,
                    }}>
                    Terms of Use
                </Text>
                <Text
                    style={{
                        fontFamily: FONT_FAMILY.BentonSansBold,
                        fontSize: FONT.TextMedium_2,
                        color: COLORS.app_theme_color,
                    }}
                    onPress={() => sheetRef1.current.snapTo(0)}>
                    Done
                </Text>
            </View>
            <View style={{margin: 10}}>
                {/* <FlatList
                    data={contents}
                    renderItem={({ item }) =>
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
                {contents !== undefined
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
            </View>
        </View>
    );

    //Set Profession fun

    // const ProfessionsFun = (item) => {
    //     if (profession === undefined) {
    //         setProfession(item.name)

    //     }
    //     else if (profession.includes(item.name)) {
    //         var Index = profession.indexOf(item.name);
    //         profession.splice(Index, 1);

    //     }
    //     else if (profession.length === 1 && !profession.includes(item.name)) return MYTOAST(`You have already selected two professions`)
    //     else {
    //         let p = [...profession];
    //         p.push(item.name);
    //         setProfession(p)
    //         console.log('D from else', p);

    //     }
    //     console.log('DDDD', profession, item.name);

    // }
    // console.log('profession: ', profession);
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
                        color: COLORS.app_theme_color,
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
                                            ? COLORS.app_theme_color
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
                                    color={COLORS.app_theme_color}
                                />
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

    // const Selected = txt => {
    //     setProfession({name: txt});
    //     setProfileState(false);
    // };
    return (

        <ScrollView contentContainerStyle={{
            flex: 1
        }}>
            <OrientationLoadingOverlay
                visible={isLoading}
                message={STRINGS.LOADING_TEXT}
            />

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

                <View style={{alignItems: 'center'}}>
                    <CustomInput
                        label="Full Name"
                        value={seekerName}
                        onChangeText={txt => storeNameData(txt)}
                        autofocus={true}
                        maxLength={30}
                        input_back={COLORS.input_back}
                    />

                    {/* <CustomInput
                        label='Profession'
                        value={profession.name}
                        onChangeText={(txt) => SearchProf(txt)}
                        input_back={COLORS.input_back}
                    />
                    {
                        profilestate ?
                            <View style={{ borderRadius: 15, width: wp('90%'), }}>
                                {
                                    professionFilterData.map((item) =>
                                        <>
                                            <Text style={{ width: wp('90%'), fontWeight: 'bold', borderColor: COLORS.white_color, borderRadius: 15, padding: 10, borderWidth: 1, backgroundColor: '#FFD130', paddingTop: 10, fontSize: 18, color: item.name === profession ? COLORS.app_theme_color : COLORS.white_color }} onPress={() => Selected(item.name)}>{item.name}</Text>
                                        </>
                                    )
                                }
                            </View>
                            :
                            null
                    } */}


                    <TouchableOpacity
                        style={Styles.touchable}
                        onPress={() => setShow(true)}>
                        <Text style={Styles.txt}>
                            {selected === ''
                                ? 'mm  /  dd  /  yyyy'
                                : moment(selected).format("MM  /  DD  /  YYYY")}
                        </Text>
                    </TouchableOpacity>

                    {show &&
                    <DateTimePickerModal
                        value={new Date(1598051730000)}
                        isVisible={show}
                        mode="date"
                        is24Hour={true}
                        onConfirm={confirmDatePicker}
                        onCancel={hideDatePicker}
                        maximumDate={new Date(new Date().getFullYear() - 13, 10, 20)}

                    />
                    }

                    <TouchableOpacity
                        style={Styles.touchable}
                        onPress={() => sheetRef2.current.snapTo(1)}>
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


                    {/* <CustomDatePicker label="mm  /  dd  /  yyyy" /> */}


                    <TouchableOpacity
                        style={Styles.touchable}
                        onPress={() => sheetRef.current.snapTo(1)}>
                        <Text style={Styles.txt}>
                            {lang ? lang : 'Preferred Subtitles'}
                            {/*{lang !== null && JSON.stringify(lang) !== `{"_U":0,"_V":1,"_W":null,"_X":null}` ? JSON.stringify(lang) : 'Preferred Subtitles'}*/}
                        </Text>
                        <AntDesign
                            style={{height: wp('7.5%'), alignSelf: 'center'}}
                            name="downcircleo"
                            size={25}
                            color={COLORS.white_color}
                        />
                    </TouchableOpacity>


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


                    {/*<Spacer space={wp('1%')}/>*/}

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
                    {/*        }}> Terms,*/}
                    {/*    </Text>*/}

                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            // textDecorationStyle: 'double',*/}
                    {/*            // textDecorationColor: "red",*/}
                    {/*            //   textDecorationLine: 'underline',*/}
                    {/*            fontSize: FONT.TextSmall_2,*/}
                    {/*            color: COLORS.white_color,*/}
                    {/*            textAlign: 'center',*/}
                    {/*            fontFamily: FONT_FAMILY.BentonSansBold,*/}
                    {/*        }}> Data,*/}
                    {/*    </Text>*/}
                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            textDecorationStyle: 'double',*/}
                    {/*            // textDecorationColor: COLORS.white_color,*/}
                    {/*            textDecorationLine: 'underline',*/}
                    {/*            fontSize: FONT.TextSmall_2,*/}
                    {/*            color: COLORS.white_color,*/}
                    {/*            textAlign: 'center',*/}
                    {/*            fontFamily: FONT_FAMILY.BentonSansBold,*/}
                    {/*        }}> Privacy and Cookie Policies.*/}
                    {/*    </Text>*/}
                    {/*</Text>*/}

                    {/* <Spacer space={wp("5%")} /> */}
                </View>

                <Spacer space={wp('2.5%')}/>

                <View style={{alignItems: 'center'}}>
                    <NewPrimaryButton
                        onPress={() => Validate()}
                        // onPress={() => navigation.navigate("otp")}
                        fontFamily={FONT_FAMILY.BentonSansBold}
                        btnText={'SIGN UP'}
                        width={wp(6)}
                        borderColor={COLORS.app_theme_color}
                        borderRadius={wp(8)}
                        verticalPaddingWithText={wp('0.6%')}
                        textColor={COLORS.app_theme_color}
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
        </ScrollView>
    );
}


