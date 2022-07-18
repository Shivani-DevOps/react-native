import React from 'react';
import {Alert, Image, Text, View,} from 'react-native';
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';

import {CommonActions} from '@react-navigation/native';
import {FONT} from '../../utils/FontSize';
import {Spacer} from '../../components/spacer';
import COLORS from '../../utils/Colors';
import {ICONS} from '../../utils/ImagePaths';
import {FONT_FAMILY} from '../../utils/Font';
import TopHeader from '../../components/header';
import {SafeAreaViewContainer,} from '../../utils/BaseStyle';
import {connect} from 'react-redux';
import BaseClass from '../../utils/BaseClass';
import NestedListView, {NestedRow} from 'react-native-nested-listview';
import STRINGS from '../../utils/Strings';
import {LogoutAction} from '../../redux/actions/LogoutAction';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const data = [{title: 'Node 1',
//     items: [{title: 'Node 1.1'}, {title: 'Node 1.2'}]
// }
// ]

class settingsScreen extends BaseClass {
    constructor(props) {
        super(props);
        this.state = {
            loginToken: '',
            isLogOut: false,

            token: '',
            settingsArray: [
                {
                    image: ICONS.MANAGE_ACCOUNT_ICON,
                    itemtitle: 'Manage Account',
                    items: [
                        {itemtitle: 'Password'},
                        {itemtitle: 'Email'},
                        {itemtitle: 'Phone Number'},
                    ],
                },
                {
                    image: ICONS.INVITE_FRIEND_ICON,
                    itemtitle: 'Invite Friends',
                },
                {
                    image: ICONS.PREFERENCES_ICON,
                    itemtitle: 'Preferences',
                },
                {
                    image: ICONS.REQUEST_VERIFY_ICON,
                    itemtitle: 'Request Verification',
                },
                {
                    image: ICONS.PAYMENT_ICON,
                    itemtitle: 'Payments',
                },
                {
                    image: ICONS.SHIPPING_ICON,
                    itemtitle: 'Shipping',
                },
                {
                    image: ICONS.PROMOTION_ICON,
                    itemtitle: 'Your Promotions',
                },
                {
                    image: ICONS.BUSINESS_ICON,
                    itemtitle: 'Business Tools',
                },
                {
                    image: ICONS.SPARKSEEKER_ICON,
                    itemtitle: 'About Sparkseeker',
                },
                {
                    image: ICONS.DIGITAL_HEALTH_ICON,
                    itemtitle: 'Your Digital Health',
                },
                {
                    image: ICONS.PRIVACY_ICON,
                    itemtitle: 'Privacy and Safety',
                },
                {
                    image: ICONS.SUPPORT_ICON,
                    itemtitle: 'Support',
                },
                {
                    image: ICONS.TESTER_ICON,
                    itemtitle: 'Become a Sparkseeker Tester',
                },
                {
                    image: ICONS.ADD_ACCOUNT_ICON,
                    itemtitle: 'Add Account',
                },
                {
                    image: ICONS.LOGOUT_ICON,
                    itemtitle: 'Logout',
                },
            ],
        };
    }

    componentDidMount() {
        // AsyncStorage.getItem(STRINGS.accessToken, async (error, result) => {
        //     if (result !== undefined && result !== null) {
        //         let loginData = JSON.parse(result);
        //         await this.setState({
        //             loginToken: loginData,
        //         });
        //     }
        // });
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     const {isLogOut} = this.state;
    //     const {navigation} = this.props;
    //     debugger;
    //     const {logoutResponse} = nextProps.logoutState;
    //     console.warn("Chk Internet--->", logoutResponse)
    //     if (logoutResponse !== undefined && isLogOut) {
    //         if (logoutResponse === 'Network Error') {
    //             this.hideDialog();
    //             this.showToastAlert(STRINGS.CHECK_INTERNET);
    //         } else {
    //             const {message, code} = logoutResponse;
    //             if (code === '200') {
    //                 this.hideDialog();
    //                 this.setState({
    //                     isLogOut: !isLogOut,
    //                 });
    //                 AsyncStorage.removeItem(STRINGS.accessToken);
    //                 navigation.dispatch(
    //                     CommonActions.reset({
    //                         index: 0,
    //                         routes: [
    //                             {name: 'login'},
    //                         ],
    //                     }),
    //                 );
    //             } else if (code === '111') {
    //                 this.hideDialog();
    //             } else {
    //                 this.showToastAlert("Session expired");
    //                 this.hideDialog();
    //             }
    //         }
    //     }
    // }
    //

    // renderItem = (node, level, isLastLeve) => {
    //     return (
    //         <View style={{
    //             flexDirection: "row",
    //
    //             paddingVertical: wp(3),
    //             paddingHorizontal: wp(2),
    //         }}
    //         >
    //             <Image source={node.image}
    //                    style={{marginLeft: wp(2), height: 29, width: 28,}}></Image>
    //
    //             <Text style={{
    //                 paddingHorizontal: wp(3),
    //                 color: COLORS.black_color,
    //                 fontFamily: FONT_FAMILY.MontserratRegular,
    //                 fontSize: FONT.TextSmall,
    //             }}>
    //                 {node.itemtitle}</Text>
    //             <View></View>
    //             {/*<Spacer space={2.5}/>*/}
    //             {/*<Text style={{ textDecorationLine: "underline", fontFamily: FONT_FAMILY.MontserratRegular }}>{item.link_name}</Text>*/}
    //             {/*<TouchableOpacity onPress={() => this.onDeleteLink(item)}>*/}
    //             {/*    <Image source={ICONS.DELETE_ICON} style={{height:24,width:24}}/>*/}
    //             {/*</TouchableOpacity>*/}
    //         </View>
    //     )
    // }

    itemClick = node => {
        const {mileStatus, userType, role} = this.state;
        let itemTitle = '';
        // console.warn("nnnnn-->>", node)
        switch (node.itemtitle) {
            case '0':
                itemTitle = 'Add Account';
                break;
            case '1':
                itemTitle = 'Manage Account';
                break;
            case '3':
                itemTitle = 'Invite Frient';
                break;
            case 'Logout':
                this.logoutUser();
                break;
            default:
        }

        // return (
        //     <View>
        //         {node.itemTitle == 5 &&
        //         this.logoutClick()}
        //         }
        //
        //
        //     </View>
        // )
    };

    logoutClick() {
        alert('dbhevdhewvfhevh');
    }

    logoutUser = () => {
        const {isLogOut, loginToken} = this.state;
        Alert.alert(
            STRINGS.APP_NAME,
            STRINGS.EXIT_ALERT,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK',
                    onPress: async () => {
                        // alert("jhjhjhj")
                        //  this.setState({isLogOut: !isLogOut});
                        let loginToken = await AsyncStorage.getItem('loginToken');
                        console.warn('Get token..', loginToken);
                        LogoutAction(
                            {
                                accessToken: loginToken,
                            },
                            response => this.handleLogoutResponse(response),
                        );
                        this.showDialog();
                    },
                },
            ],
            {cancelable: false},
        );
    };

    handleLogoutResponse = response => {
        const {navigation} = this.props;

        console.warn('toooooo--->', response);
        //  const {code, data} = response;
        const {code, message, data} = response;
        if (code == '200') {
            this.hideDialog();
            this.showToastSucess(response.message);
            AsyncStorage.removeItem("accessToken");
            AsyncStorage.removeItem("userDetail");
            AsyncStorage.removeItem("loginUserId");

            AsyncStorage.removeItem("loginData");
            AsyncStorage.removeItem("userType")
            navigation.dispatch(
                CommonActions.reset({
                    index: 1,
                    routes: [
                        {name: "splash"},
                        {name: 'login'},
                    ],
                }),
            )
        } else if (code == '111') {
            this.hideDialog();
        } else {
            this.showToastAlert('Session expired');
            this.hideDialog();
        }
    };

    render() {
        const {navigation} = this.props;
        const {settingsArray} = this.state;

        return (
            <>
                <TopHeader
                    backgroundColor={COLORS.app_theme_color}
                    text={'Settings'}
                    onPressBackArrow={() => navigation.pop()}
                />
                {/*<View style={{backgroundColor:"red",justifyContent:"center",height:wp("20%"),}}>*/}
                {/*    <TouchableOpacity*/}
                {/*        onPress={() => this.logoutUser()}>*/}
                {/*    <Text style={{fontSize:20,textAlign:"center",backgroundColor:"greem"}}>*/}
                {/*        Logout*/}
                {/*    </Text>*/}
                {/*    </TouchableOpacity>*/}
                {/*</View>*/}
                <SafeAreaViewContainer style={{backgroundColor: COLORS.white_color}}>
                    {/*<View style={{*/}
                    {/*    flex: 1,*/}
                    {/*    flexDirection: 'column',*/}
                    {/*    justifyContent: 'space-evenly'}}>*/}

                    {/*    <FlatList*/}
                    {/*        style={{  }}*/}
                    {/*        data={settingsArray}*/}
                    {/*        renderItem={({ item, index }) => this.renderItem(item, index)} />*/}

                    {/*</View>*/}

                    {/*<View style={{*/}
                    {/*    backgroundColor:'green',*/}
                    {/*   }}>*/}
                    <NestedListView
                        data={settingsArray}
                        getChildrenName={node => 'items'}
                        //  onNodePressed={(node) => alert("ddddd")}
                        onNodePressed={node => this.itemClick(node)}
                        renderNode={(node, level, isLastLevel) => (
                            <NestedRow
                                level={level}
                                style={{
                                    paddingVertical: wp("2%"),
                                    paddingHorizontal: wp("2%"),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignContent: 'flex-start',
                                        flex: 1,
                                    }}>
                                    <Image
                                        source={node.image}
                                        style={{
                                            marginLeft: wp("1%"),
                                            height: hp("3.5%"),
                                            width: wp("5%"),
                                            resizeMode: "contain",
                                            //  backgroundColor: "pink"
                                        }}></Image>
                                    <Spacer space={2.5}/>
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                paddingHorizontal: wp(3),
                                                color: COLORS.black_color,
                                                fontFamily: FONT_FAMILY.MontserratRegular,
                                                fontSize: FONT.TextSmall,
                                            }}>
                                            {node.itemtitle}
                                        </Text>
                                    </View>
                                </View>
                                <Spacer space={1}/>

                                <View style={{
                                    height: hp("0.1%"),
                                    width: wp("95%"),
                                    backgroundColor: "#D8D8D8"

                                }}></View>
                            </NestedRow>
                        )}
                    />

                    {/*</View>*/}
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
    logoutState: state.LogoutReducer,
});

// ----------------------------------------

const mapDispatchToProps = dispatch => {
    return {
        logout: payload => dispatch(LogoutAction(payload)),
    };
};

// ----------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(settingsScreen);
