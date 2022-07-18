import React from 'react';
import {Alert, Image, View} from 'react-native';
import {DrawerItem} from '@react-navigation/drawer';
import {connect} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Spacer} from '../../components/spacer';
import {styles} from './styles';
import BaseClass from '../../utils/BaseClass';
import OrientationLoadingOverlay from '../../utils/CustomLoader';
//import {LogoutAction} from '../../redux/actions/LogoutAction';
import STRINGS from '../../utils/Strings';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {ICONS} from '../../utils/ImagePaths';

class CustomDrawerContent extends BaseClass {
    constructor(props) {
        super(props);
        this.setState({
            isLogOut: false,
            authToken: '',
            name: '',
            accountType: '',

            ownerId: '',
            address: '',
            phone_number: '',
            userName: '',
            firstName: '',
            lastName: '',
            email: '',
            account_type: '',
            account_type_id: 0,
            loginData: {},
            profile: '',

        });
    }

    componentDidMount() {
        const {navigation} = this.props;
        this._unsubscribe = navigation.addListener('focus', () => {
            this.onFocusFunction();
        });
    }

    onFocusFunction = () => {
        AsyncStorage.getItem("accessToken", async (error, result) => {
            if (result !== undefined && result !== null) {

                console.warn("chec", result)
                await this.setState({
                    authToken: result,
                });
                AsyncStorage.getItem("loginData", async (error, result) => {
                    if (result !== undefined && result !== null) {
                        let loginData = JSON.parse(result);
                        await this.setState({
                            loginData: loginData,


                        });
                    }
                });
            }
        });
    };

    componentWillUnmount() {
        this._unsubscribe();
    }

    // componentWillReceiveProps(nextProps, nextContext) {
    //     const {isLogOut} = this.state;
    //     const {navigation} = this.props;
    //
    //     const {logoutResponse} = nextProps.logoutState;
    //     console.warn("responseLogout", logoutResponse)
    //     if (logoutResponse !== undefined && isLogOut) {
    //         if (logoutResponse === 'Error: Network Error') {
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
    //                 AsyncStorage.removeItem(STRINGS.loginData);
    //
    //                 navigation.dispatch(
    //                     CommonActions.reset({
    //                         index: 0,
    //                         routes: [
    //                             {name: 'loginFirstScreen'},
    //                         ],
    //                     }),
    //                 );
    //             } else {
    //                 this.showToastAlert('Session expired');
    //                 this.hideDialog();
    //             }
    //         }
    //     }
    //     // this.updateUserData();
    // }

    handlLogoutResponse = (response) => {
        console.warn("resdddd", response)
        const {navigation} = this.props;
        const {navigate} = navigation;
        const {checked, email} = this.state;
        if (response !== 'Network Error') {
            this.hideDialog();
            const {code, message, data} = response;
            if (code == '200') {
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
                );
                this.showToastSucess('Logged out successfully.');
            }
        } else {
            this.hideDialog();
            this.showToastAlert(STRINGS.CHECK_INTERNET);
        }

    }


    logoutUser = () => {
        const {isLogOut, authToken} = this.state;
        console.warn("token", authToken)
        Alert.alert(
            STRINGS.APP_NAME,
            STRINGS.EXIT_ALERT,
            [
                {
                    text: 'Cancel', style: 'cancel',
                },
                {
                    text: 'OK', onPress: () => {
                        this.setState({isLogOut: !isLogOut});
                        LogoutAction({
                            accessToken: authToken
                        }, response => this.handlLogoutResponse(response));
                        this.showDialog();
                    },
                },

            ],
            {cancelable: false});
    };


    _renderCustomLoader = () => {
        const {isLoading} = this.state;
        return (
            <OrientationLoadingOverlay visible={isLoading} message="Loading.."/>
        );
    };


    render() {
        const {name, profile, userName, firstName, lastName, account_type, account_type_id} = this.state;
        return (

            <View style={{flex: 1,}}>
                <Spacer space={2.5}/>
                {/*<View style={{backgroundColor:'grey',justifyContent:'space-evenly',height:hp(90)}}>*/}

                <View style={{alignItems: 'center', flexDirection: 'row', backgroundColor: 'green'}}>
                    <Image source={ICONS.MANAGE_ACCOUNT_ICON}
                           style={{marginLeft: wp(5), height: 29, width: 24}}></Image>

                    <DrawerItem
                        style={{backgroundColor: 'pink', width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Manage Account"
                        onPress={() => alert("Coming Soon...")}
                        // onPress={() => this.props.navigation.navigate('pHome')}
                    />

                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.INVITE_FRIEND_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Invite Friends"
                        onPress={() => this.props.navigation.navigate('projectListingScreen')}

                    />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Preferences"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />

                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Request Verification"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />

                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Payments"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />

                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Shipping"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Your Promotions"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>
                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Business Tools"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="About Sparkseeker"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Your Digital Health"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Privacy and Safety"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Support"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Become a Sparkseeker Tester"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.NOTIFICATION_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Add Account"
                        onPress={() => this.props.navigation.navigate('notificationScreen')}

                    />
                </View>

                <View style={{alignItems: 'center', flexDirection: 'row'}}>
                    <Image source={ICONS.LOGOUT_ICON}
                           style={{marginLeft: wp(5), height: 24, width: 24}}></Image>
                    <DrawerItem
                        style={{width: wp(55)}}
                        labelStyle={styles.labelTextStyle}
                        label="Logout"

                        onPress={() => this.logoutUser()}
                    />
                </View>
                {/*</View>*/}


            </View>

        );
    }
}

// ----------------------------------------
// ----------------------------------------
// CONNECT
// ----------------------------------------

const mapStateToProps = (state) => ({
    logoutState: state.LogoutReducer,
});

// ----------------------------------------

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (payload) => dispatch(LogoutAction(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomDrawerContent);

// export default CustomDrawerContent
