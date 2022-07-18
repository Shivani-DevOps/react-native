/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {Platform} from 'react-native';
import AppNavigator from './src/route/AppNavigator';
import {Provider} from 'react-redux';
import Store from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import AppConstant from './src/utils/constants';
import {CommonActions} from '@react-navigation/routers';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {isAlreadyLoggedIn: false, isLoading: true};
  }

  componentDidMount = async () => {
    this.setState({isLoading: true});
    await this.requestPermissionsForIos();
    AsyncStorage.getItem('userDetail', (error, result) => {
      if (result !== undefined && result !== null) {
        this.setState({isAlreadyLoggedIn: true});
        AppConstant.shared.globalStoredUserInfo = JSON.parse(result);
      }
      this.setState({isLoading: false});
    });

    messaging().onMessage(async remoteMessage => {
      console.warn('notification message received', remoteMessage);
      // Store.dispatch(ForegroundNotificationSuccess(remoteMessage));

      //new code for foreground notifications
      const {title, body} = remoteMessage.notification;
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: 'your-channel-id', // (required) channelId, if the channel doesn't exist, it will be created with options passed above (importance, vibration, sound). Once the channel is created, the channel will not be update. Make sure your channelId is different if you change these options. If you have created a custom channel, it will apply options of the channel.
        ticker: 'My Notification Ticker', // (optional)
        vibrate: true, // (optional) default: true

        ongoing: false, // (optional) set whether this is an "ongoing" notification
        priority: 'max', // (optional) set notification priority, default: high
        visibility: 'public', // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.

        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        title: title, // (optional)
        message: body, // (required)
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      });
    });
  };

  requestPermissionsForIos = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      this.getToken();
    } else {
    }
  };

  getToken = async () => {
    let fcmToken = await messaging().getToken();
    console.warn('FCM tokens-->>>>>', fcmToken);
    AsyncStorage.setItem('FcmToken', JSON.stringify(fcmToken));
  };

  pushNotificationInitialization = () => {
    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.warn('TOKEN:', token);
        try {
          AsyncStorage.setItem('DeviceToken', token.token);
        } catch (e) {}
      },
      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.warn('NOTIFICATION:', notification);
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  render() {
    // console.disableYellowBox = true;
    return (
      <Provider store={Store}>
        {this.state.isLoading ? null : (
          <AppNavigator isAuthenticated={this.state.isAlreadyLoggedIn} />
        )}
      </Provider>
    );
  }
}
