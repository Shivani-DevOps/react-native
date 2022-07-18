// import React, { useState, createRef } from 'react'
// import {
//     View,
//     Image,
//     TouchableOpacity,
//     Text

// } from 'react-native'
// import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import TopHeader from '../../../components/header';
// import { Spacer } from '../../../components/spacer';
// import Styles from './styles';
// import COLORS from '../../../utils/Colors';
// import { NewPrimaryButton } from '../../../components/buttons/PrimaryButton';
// import BottomSheet from 'reanimated-bottom-sheet';

// import CustomInput from '../../../components/textInput/CustomInput';
// import { CustomDatePicker } from '../../../components/DateTimePicker/DatePicker';
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import {FONT_FAMILY} from "../../../utils/Font";
// import {FONT} from "../../../utils/FontSize";
// import Otp from './Otp'
// import { BusinessSignupAction } from '../../../redux/actions/BusinessSignupAction';
// import STRINGS from '../../../utils/Strings';

// const LANGUAGES = ['Arabic', 'English', 'French', 'Hindi', 'Spanish','Russia']

// export default function BusinessSignup({ route,navigation }) {

//     const [email, setEmail] = useState('');
//     const [userName, setUserName] = useState('');
//     const [password, setPassword] = useState('');
//     const [lang, setLang] = useState('Preferred Subtitles');

//     const { actype, businessName, contactName, businessPhoneNumber} = route.params;




//     const handleSignupResponse = (response) => {
//         console.warn('SignupResponse-->', response.message);

//         if (response !== 'Network Error') {
            
//             const {code, message, data} = response;
//             if (code === 200) {
                
//                 alert('Sign up successfully.');
                
//             }
//             else{
//                 alert("Something went wrong Please Try Later")
//             }
            
//         } else {
//             alert(STRINGS.CHECK_INTERNET);
//         }

//     };

//     // const SignupClick = async () => {

//     //     // console.warn("checkToken", fcmToken)
//     //     BusinessSignupAction({
//     //         actype: actype === "3" ? "individualPersonal" : actype === "4" ? "individualProfessional": actype === "3" ? "business" : actype === "4" ? "Non profit": null,
//     //         businessName: businessName,
//     //         contactName: contactName,
//     //         businessPhoneNumber: businessPhoneNumber,
//     //         Email: email,
//     //         userName: userName,
//     //         password: password,
//     //         lang: lang,
//     //         profession: actype === "1" || "2" ? "individual" : actype === "3" || "4" ? "business": null,
//     //     }, data => handleSignupResponse(data)); 
//     // }


//     const renderContent = () => (
//         <View
//             style={{
//                 backgroundColor: "#fff",
//                 height: hp('45%'),
//                 width: wp('100%')

//             }}
//         >

//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 30 }}>
//                 <Text style={{ fontSize: 20, }}>SELECT LANGUAGE</Text>
//                 <Text style={{ fontSize: 18, color: COLORS.app_theme_color }} onPress={() => sheetRef.current.snapTo(0)}>Done</Text>
//             </View>
//             <View style={{ margin: 10 }}>
//                 {
//                     LANGUAGES.map(item =>
//                         <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
//                             <Text style={{ fontSize: 18, margin: 5, color: lang === item ? COLORS.app_theme_color : COLORS.black_color }} onPress={() => setLang(item)}>{item}</Text>
//                             {
//                                  lang === item ?
//                                 <AntDesign name="check" size={25} color={COLORS.app_theme_color} />
//                                 :
//                                 null
//                             }
//                         </View>
//                     )
//                 }
//             </View>
//         </View>
//     );

//     const renderContentTerms = () => (
//         <View
//             style={{
//                 backgroundColor: "#fff",
//                 // height: hp('70%'),
//                 // width: wp('100%')

//             }}
//         >

//             <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 30 }}>
//                 <Text style={{ fontFamily: FONT_FAMILY.BentonSansMedium,
//                     fontSize: FONT.TextMedium,}}>Terms of Use</Text>
//                 <Text style={{  fontFamily: FONT_FAMILY.BentonSansMedium,
//                     fontSize: FONT.TextSmall_2, color: COLORS.blue_color}}>Done</Text>
//             </View>
//             <View style={{ margin: 10 }}>
//                 <Text style={{fontFamily: FONT_FAMILY.MontserratRegular,
//                     fontSize: FONT.TextSmall_2, width: wp('80%'), alignSelf: 'center' }}>
//                 So strongly and metaphysically did I conceive of my situation then, that while earnestly watching his motions, I seemed distinctly to perceive that my own individuality was now merged in a joint stock company of two; that my free will had received a mortal wound; and that another's mistake or misfortune might plunge innocent me into unmerited disaster and death. Therefore, I saw that here was a sort of interregnum in Providence; for its even-handed equity never could have so gross an injustice. And yet still further pondering—while I jerked him now and then from between the whale and ship, which would threaten to jam him—still further pondering, I say, I saw that this situation of mine was the precise situation of every mortal that breathes; only, in most cases, he, one way or other, has this Siamese connexion with a plurality of other mortals. If your banker breaks, you snap; if your apothecary by mistake sends you poison in your pills, you die. True, you may say that, by exceeding caution, you may possibly escape these and the multitudinous other evil chances of life. But handle Queequeg's monkey-rope heedfully as I would, sometimes he jerked it so, that I came very near sliding overboard. Nor could I possibly forget that, do what I would, I only had the management of one end of it.
//                 </Text>
//             </View>
//         </View>
//     );

//     const sheetRef = React.useRef(null);
//     const sheetRef1 = React.useRef(null);
//     return (
//         <>
//             <View style={Styles.mainContainer2}>
//                 <View>
//                     <Spacer space={1} />
//                     <TopHeader
//                         onPressBackArrow={() => navigation.goBack()}

//                     />
//                     <Image
//                         source={require('../../../assets/images/logo.png')}
//                         style={{ alignSelf: 'center', width: wp('50%'), resizeMode: 'stretch' }}
//                     />
//                     {/* <Spacer space={1} /> */}
//                 </View>

//                 {/* <Text style={Styles.txt}>Select</Text> */}
//                 <View style={{ alignItems: 'center' }}>

//                 <CustomInput
//                         label='Email'
//                         value={email}
//                         onChangeText={(txt) => setEmail(txt)}
//                     />

//                     <CustomInput
//                         label='Username'
//                         value={userName}
//                         onChangeText={(txt) => setUserName(txt)}
//                     />


//                          <CustomInput
//                         label='Password'
//                         value={password}
//                         onChangeText={(txt) => setPassword(txt)}
//                         secureTextEntry={true}
//                         />



//                     <TouchableOpacity
//                         style={Styles.touchable}
//                         onPress={() => sheetRef.current.snapTo(1)}
//                     >
//                         <Text style={Styles.txt}>{lang}</Text>
//                         <AntDesign name="downcircleo" size={25} color={COLORS.white_color} />
//                     </TouchableOpacity>

//                     <Text style={{ fontSize: 12, margin: 20, color: COLORS.white_color, width: wp('80%') }}
//                     onPress={() => sheetRef1.current.snapTo(1)}
//                     >
//                         By signing up, you agree to our
//                         <Text style={{textDecorationLine:'underline'}}> Terms, Data, Privacy and Cookie Policies.</Text>

//                     </Text>

//                 </View>
//                 <View style={{ alignItems: 'center' }}>
//                     <NewPrimaryButton
//                         onPress={() => navigation.navigate('otp')}
//                         fontFamily={FONT_FAMILY.BentonSansBold}
//                         btnText={'SIGN UP'}
//                         width={wp(6)}
//                         borderColor={COLORS.blue_color}
//                         borderRadius={wp(8)}
//                         verticalPaddingWithText={wp("0.6%")}
//                         textColor={COLORS.blue_color}
//                         color={'#FFFFFF'}

//                     />
//                     <Spacer space={10} />
//                 </View>


//             </View>
//             <BottomSheet
//                 ref={sheetRef}
//                 snapPoints={[0, hp('45%'), hp('30%'), 0]}
//                 borderRadius={10}
//                 renderContent={renderContent}
//             />
//              <BottomSheet
//                 ref={sheetRef1}
//                 snapPoints={[0, hp('70%'), hp('30%'), 0]}
//                 borderRadius={10}
//                 renderContent={renderContentTerms}
//             />

//         </>
//     )


//     }
