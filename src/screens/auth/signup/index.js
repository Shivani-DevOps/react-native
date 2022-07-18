import React, {useState} from 'react';
import {Image, StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import TopHeader from '../../../components/header';
import {Spacer} from '../../../components/spacer';
import Styles from './styles';
import BottomSheet from 'reanimated-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import {Tooltip} from 'react-native-elements';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';
import {ICONS} from '../../../utils/ImagePaths';

export default function index({navigation}) {
    const [value, setValue] = useState('select');

    const Navfunction = () => {
        if (value === 'select') {
            alert('please choose account type');
        } else if (value === '1' || value === '2') {
            navigation.navigate('individual', {actype: value});
        } else if (value === '3' || value === '4') {
            navigation.navigate('business', {actype: value});
        }
    };

    const renderContent = () => (
        <View
            style={{
                backgroundColor: '#fff',
                height: hp('65%'),
                justifyContent: 'space-between',
            }}>
            <TouchableOpacity>
                {/* <FontAwesome5 name="minus" size={35} color={COLORS. button_Light_color} style={{flexDirection:'row',marginLeft:'45%'}}/> */}
                <Image
                    source={ICONS.DRAG_HANDLE}
                    style={{marginLeft: '43%', marginTop: '7%'}}
                />
            </TouchableOpacity>
            <View style={{padding: 20}}>
                <View>
                    <Text
                        style={{
                            padding: wp('6%'),
                            fontFamily: FONT_FAMILY.BentonSansBold,
                            fontSize: FONT.TextMedium_2,
                        }}>
                        SIGN UP AS
                    </Text>
                    <Spacer space={'1%'}/>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        onPress={() => setValue('1')}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Entypo
                                name="dot-single"
                                size={35}
                                color={COLORS.app_theme_color}
                            />
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall,
                                    color:
                                        value === '1' ? COLORS.app_theme_color : COLORS.black_color,
                                }}>
                                Individual Personal
                            </Text>
                        </View>
                        {value === '1' ? (
                            <Entypo name="check" size={25} color={COLORS.app_theme_color}/>
                        ) : null}
                    </TouchableOpacity>
                    <Spacer space={'3%'}/>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        onPress={() => setValue('2')}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Entypo
                                name="dot-single"
                                size={35}
                                color={COLORS.app_theme_color}
                            />
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall,
                                    color:
                                        value === '2' ? COLORS.app_theme_color : COLORS.black_color,
                                }}>
                                Individual Professional
                            </Text>
                        </View>
                        {value === '2' ? (
                            <Entypo name="check" size={25} color={COLORS.app_theme_color}/>
                        ) : null}
                    </TouchableOpacity>
                    <Spacer space={'3%'}/>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        onPress={() => setValue('3')}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Entypo name="dot-single" size={35} color="#68BAAF"/>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall,
                                    color: value === '3' ? COLORS.blue_color : COLORS.black_color,
                                }}>
                                Business{' '}
                            </Text>
                        </View>
                        {value === '3' ? (
                            <Entypo name="check" size={25} color={COLORS.blue_color}/>
                        ) : null}
                    </TouchableOpacity>
                    <Spacer space={'3%'}/>

                    <TouchableOpacity
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                        }}
                        onPress={() => setValue('4')}>
                        <View style={{alignItems: 'center', flexDirection: 'row'}}>
                            <Entypo name="dot-single" size={35} color="#68BAAF"/>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall,
                                    color: value === '4' ? COLORS.blue_color : COLORS.black_color,
                                }}>
                                Non Profit
                            </Text>
                        </View>
                        {value === '4' ? (
                            <Entypo name="check" size={25} color={COLORS.blue_color}/>
                        ) : null}
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{alignItems: 'center'}}>
                <Tooltip
                    backgroundColor="#fff"
                    overlayColor={'transparent'}
                    height={hp('39%')}
                    width={wp('95%')}
                    pointerColor={'#fff'}
                    containerStyle={{
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,

                        elevation: 5,
                    }}
                    popover={
                        <View>
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansBold,
                                    fontSize: FONT.TextSmall_2,
                                }}>
                                Account Types:
                            </Text>
                            <Spacer space={'3%'}/>

                            <Text
                                style={{
                                    color: '#262729',
                                    width: wp('80%'),
                                    fontFamily: FONT_FAMILY.MontserratRegular,
                                    fontSize: FONT.TextSmall_2,
                                }}>
                                “Individual Personal” - Will have access to very basic metrics.
                            </Text>
                            <Spacer space={'1%'}/>

                            <Text
                                style={{
                                    width: wp('80%'),
                                    color: '#262729',
                                    fontFamily: FONT_FAMILY.MontserratRegular,
                                    fontSize: FONT.TextSmall_2,
                                }}>
                                “Individual Professional” - Will be used if you plan to monetize
                                your content. Will have access to business level metrics.
                            </Text>
                            <Spacer space={'1%'}/>

                            <Text
                                style={{
                                    width: wp('80%'),
                                    fontFamily: FONT_FAMILY.MontserratRegular,
                                    fontSize: FONT.TextSmall_2,
                                }}>
                                {' '}
                                “Business” - Will be used if you plan to monetize your content.
                            </Text>
                            <Spacer space={'1%'}/>

                            <Text
                                style={{
                                    width: wp('80%'),
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall_2,
                                }}>
                                “Non-Profit” - Will be used if you plan to monetize your
                                content.
                            </Text>
                        </View>
                    }>
                    <View
                        style={{
                            paddingHorizontal: wp("3%"),
                            flexDirection: 'column',
                            width: wp('90%'),
                        }}>
                        <Text
                            style={{
                                fontFamily: FONT_FAMILY.BentonSansRegular,
                                fontSize: FONT.TextSmall_2,
                                //  backgroundColor: "pink",
                                width: wp('90%'),
                            }}>
                            Unsure about which account to select,{' '}
                            <Text
                                style={{
                                    fontFamily: FONT_FAMILY.BentonSansRegular,
                                    fontSize: FONT.TextSmall,
                                    color: value === '3' || value === '4' ? COLORS.blue_color : COLORS.app_theme_color
                                }}>
                                click here
                            </Text>{' '}
                        </Text>
                    </View>
                </Tooltip>
                <Spacer space={'3%'}/>

                <NewPrimaryButton
                    onPress={() => Navfunction()}
                    btnText={'NEXT'}
                    width={wp(7)}
                    // borderColor={COLORS.app_theme_color}
                    borderRadius={wp(8)}
                    verticalPaddingWithText={3}
                    textColor={COLORS.white_color}
                    // color={COLORS.app_theme_color}
                    color={value === '3' || value === '4' ? COLORS.blue_color : COLORS.app_theme_color}
                />
                <Spacer space={wp('10%')}/>
            </View>
        </View>
    );

    const sheetRef = React.useRef(null);

    return (
        <>
            <StatusBar
                barStyle={'dark-content'}
                backgroundColor={COLORS.app_theme_color}
                hidden={false}
            />
            <View style={Styles.mainContainer1}>
                <Spacer space={2}/>
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
                <Spacer space={1}/>
                {/*<Text style={{*/}
                {/*    paddingVertical: wp('1%'),*/}
                {/*    paddingHorizontal: wp('6%'),*/}

                {/*    backgroundColor:"green",*/}
                {/*   // paddingVertical:wp("1")*/}
                {/*}}>Are You</Text>*/}
                {/* <Text style={Styles.txt}>Select</Text> */}
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        //   backgroundColor: "pink",
                    }}>
                    <TouchableOpacity
                        style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                            width: wp('90%'),
                            borderColor: '#fff',
                            // color:"#fff",
                            borderRadius: 50,
                            borderWidth: 1,
                            paddingHorizontal: wp('3%'),
                            opacity: 0.8,
                            marginTop: wp('5%'),
                            height: wp('12%'),
                            paddingVertical: wp('3.2%'),
                            backgroundColor: COLORS.input_back,
                        }}
                        onPress={() => sheetRef.current.snapTo(1)}>
                        <Text style={{color: 'white', textAlign: 'center'}}>Select</Text>
                        <AntDesign
                            style={{
                                height: hp('3%'),
                                //  alignItems:"center",
                                alignSelf: 'center',
                            }}
                            name="downcircleo"
                            size={24}
                            color={COLORS.white_color}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[0, hp('57%'), 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
        </>
    );
}
