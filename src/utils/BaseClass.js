// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, {Component} from "react";
import {Platform, Linking} from "react-native";
import Snackbar from "react-native-snackbar";
import COLORS from "./Colors";
import Toast from "react-native-simple-toast";

let autoRefreshToken;

/*
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 *  MAIN CLASS
 * ---------------------------------------------------------------------------------------
 * ---------------------------------------------------------------------------------------
 */
export default class BaseClass extends Component {
// ----------------------------------------
// ----------------------------------------
// CONSTRUCTOR AND LIFE CYCLES
// ----------------------------------------
    constructor(props) {
        super(props);
        this.isAllow = false;
        this.currentRouteName = 'Home';
        this.token = '';
        this.state = {
            isInternetConnected: undefined,
            isLoading: false
        };
    }

    // ----------------------------------------
// ----------------------------------------
// DATA METHODS
// ----------------------------------------
    showToast(title) {
        if (Platform.OS === 'ios') {
            Snackbar.show({
                text: title,
                textColor: COLORS.white_color,
                backgroundColor: COLORS.black_color,
                duration: Snackbar.LENGTH_LONG,
                action: {
                    textColor: 'white',
                    onPress: () => { /* Do something. */
                    },
                },
            });
        } else {
            Toast.show(title, 3000)
        }
    }

// ----------------------------------------

    showToastSucess(title) {
        if (Platform.OS === 'ios') {
            Snackbar.show({
                text: title,
                textColor: COLORS.white_color,
                backgroundColor: COLORS.off_grey,
                duration: Snackbar.LENGTH_LONG,
                action: {
                    textColor: 'white',
                    onPress: () => { /* Do something. */
                    },
                },
            });
        } else {
            Toast.show(title, 4000)
        }
    }

// ----------------------------------------

    showToastAlert(title) {
        if (Platform.OS === 'ios') {
            Snackbar.show({
                text: title,
                textColor: COLORS.white_color,
                backgroundColor: COLORS.failure_Toast,
                duration: Snackbar.LENGTH_LONG,
                action: {
                    textColor: COLORS.failure_Toast,
                    onPress: () => { /* Do something. */
                    },
                },
            });
        } else {
            Toast.show(title, 3000)
        }
    }

// ----------------------------------------
    /**
     * start screen loader.....
     * @param isLoading
     */
    showDialog() {
        this.setState({isLoading: true});
        // this.isLoading = true
    }

// ----------------------------------------
    /**
     * stop screen loader.....
     * @param isLoading
     */
    hideDialog() {
        this.setState({isLoading: false});
        // this.isLoading = false;
    }


// ----------------------------------------
    /**
     * make link to device phone.....
     * @param isLoading
     */
    goToDialNumber(phone) {
        let phoneNumber = phone;
        if (Platform.OS !== 'android') {
            phoneNumber = `telprompt:${phone}`;
        } else {
            phoneNumber = `tel:${phone}`;
        }
        Linking.openURL(phoneNumber)
    }


// ----------------------------------------
    /**
     * auto refreshing token () start & cancel......
     * @param value
     */
    autoRefreshToken(value) {
        if (value === "start") {
            autoRefreshToken = setInterval(() => {
                this.requestTokenRefresh()
            }, 3000000) // 50 mins
        } else {
            clearInterval(autoRefreshToken);
        }
    }


    /**
     * token () start & cancel......
     * @param value
     */
    deviceToken() {
        // return Math.floor(100000 + Math.random() * 900000);
        return 'dS2QlUfz79o:APA91bEzcChZ4u_ZUdxOn9nGr3zbk0bQpkBtr2PT7VX2imJi3ZvgpkXyT0sDIzxl52FrrhuTgLKNxZkCMEwb947uPL-lGz3xM4nTIiSGHOcESpXyDwZ-Id2iOY3rJ32d1s5-LPPOZF6X1'
    }


    imageTimestamp() {
        return Math.floor(100000 + Math.random() * 900000);
    }


}
