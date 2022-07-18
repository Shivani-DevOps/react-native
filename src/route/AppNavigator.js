import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Splash from '../screens/auth/splash';
import Login from '../screens/auth/login';
import Signup from '../screens/auth/signup';

import ResetPassword from '../screens/auth/resetPassword';
import homeScreen from '../screens/home';
import settingsScreen from '../screens/settings';

import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {navigationRef} from '../../RootNavigation';
import Individual from '../screens/auth/signup/Individual';
import IndividualSignup from '../screens/auth/signup/Individualsignup';
import Business from '../screens/auth/signup/Business';
import Businesssignup from '../screens/auth/signup/Businesssignup';
import Onboarding from '../screens/auth/signup/Onboarding';
import CustomDrawerContent from '../screens/drawer/drawerContentComponent';
import MyTabs from './Tabs';
import Otp from '../screens/auth/signup/Otp';
import Otp1 from '../screens/auth/signup/Otp1';
import WizardScreen from '../screens/WizardScreen';
import FinalizeVideoFromScreen from '../screens/finalizevideo';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="homeScreen"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: wp(100),
          backgroundColor: 'red',
        },
      }}
      drawerContent={props => {
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen name="Screens" component={DrawerScreens} />
    </Drawer.Navigator>
  );
};

const AppNavigator = ({isAuthenticated}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={isAuthenticated ? 'Tabs' : 'splash'}
        options={{headerShown: false}}>
        <Stack.Screen
          name="splash"
          options={{headerShown: false}}
          component={Splash}
        />
        <Stack.Screen
          name="login"
          options={{headerShown: false}}
          component={Login}
        />
        <Stack.Screen
          name="ResetPassword"
          options={{headerShown: false}}
          component={ResetPassword}
        />
        <Stack.Screen
          name="homeScreen"
          options={{headerShown: false}}
          component={homeScreen}
        />
        <Stack.Screen
          name="settingsScreen"
          options={{headerShown: false}}
          component={settingsScreen}
        />
        <Stack.Screen
          name="signup"
          options={{headerShown: false}}
          component={Signup}
        />
        <Stack.Screen
          name="individual"
          options={{headerShown: false}}
          component={Individual}
        />
        <Stack.Screen
          name="individualsignup"
          options={{headerShown: false}}
          component={IndividualSignup}
        />
        <Stack.Screen
          name="business"
          options={{headerShown: false}}
          component={Business}
        />
        <Stack.Screen
          name="businesssignup"
          options={{headerShown: false}}
          component={Businesssignup}
        />
        <Stack.Screen
          name="onboarding"
          options={{headerShown: false}}
          component={Onboarding}
        />
        <Stack.Screen
          name="Tabs"
          options={{headerShown: false}}
          component={MyTabs}
        />
        <Stack.Screen
          name="otp"
          options={{headerShown: false}}
          component={Otp}
        />
        <Stack.Screen
          name="otp1"
          options={{headerShown: false}}
          component={Otp1}
        />
        <Stack.Screen
          name="wizardScreen"
          options={{headerShown: false}}
          component={WizardScreen}
        />
        <Stack.Screen
          name="FinalizeVideoFromScreen"
          options={{headerShown: false}}
          component={FinalizeVideoFromScreen}
        />

        {/*<Stack.Screen options={{ headerShown: true }}  name="homeScreen" component={DrawerNavigator}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const DrawerScreens = ({style}) => {
  return (
    <Stack.Navigator initialRouteName="homeScreen" headerMode="none">
      <Stack.Screen
        name="homeScreen"
        options={{headerShown: false}}
        component={homeScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

// import * as React from 'react';
// import { View } from "react-native";
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import OnboardingScreen from "../screens/OnboardingScreen";
// import LoginScreen from "../screens/LoginScreen";
// import Dashboard from '../screens/Dashboard';
// import Photos from '../screens/Photos';
// import Events from '../screens/Events';
// import Inbox from '../screens/Inbox';
// import CustomDrawerContent from '../screens/Drawer/DrawerContentComponent';
// import ProfileScreen from '../screens/Profile/index';
// import CommentScreen from '../screens/Comment/index';
// // import SettingScreen
// // import NotificationScreen
// // import PlannerScreen
// // import Logout screen
//
// import ClientDetailsScreen from '../screens/ClientDetails';
// import IconFeather from 'react-native-vector-icons/Feather';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import COLORS from '../utils/Colors';
// import DeviceInfo from 'react-native-device-info';
//
// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();
//
//
// const DrawerNavigator = () => {
//     return (
//         <Drawer.Navigator initialRouteName="Dashboard"
//                           screenOptions={{
//                               headerShown: false
//                           }}
//                           drawerStyle={{
//                               width: wp(78),
//                               backgroundColor: COLORS.backGround_color
//                           }}
//                           drawerContent={props => {
//                               return <CustomDrawerContent {...props} />;
//                           }}
//         >
//             <Drawer.Screen name="Screens" component={DrawerScreens} />
//         </Drawer.Navigator>
//     );
// };
//
//
// _renderTabIcon = (focused, name, color) => {
//     if (focused) {
//         return (
//             <View style={{
//                 height: wp("13%"),
//                 width: wp("13%"),
//                 borderRadius: wp("4%"),
//                 alignItems: "center",
//                 justifyContent: "center",
//                 backgroundColor: 'transparent'
//             }}>
//                 <IconFeather name={name} color={color} size={wp(7)} />
//             </View>
//         )
//     } else {
//         return (
//             <IconFeather name={name} color={'black'} size={wp(6)} />
//         )
//     }
// }
//
//
// const Tabnavigation =() => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 headerShown: false,
//                 tabBarIcon: ({ color, focused }) => {
//                     let iconName;
//
//                     if (route.name === 'Clients') {
//                         iconName = 'users'
//                     }
//                     else if (route.name === 'Photos') {
//                         iconName = 'image'
//                     }
//                     else if (route.name === 'Events') {
//                         iconName = 'layout'
//                     }
//                     else if (route.name === 'Inbox') {
//                         iconName = 'inbox'
//                     }
//                     // You can return any component that you like here!
//                     return (
//                         this._renderTabIcon(focused, iconName, focused ? '#5776E2' : '#1B1B22')
//                     )
//                 },
//             })}
//             tabBarOptions={{
//                 // activeTintColor: "#1B1B22",
//                 // inactiveTintColor: "",
//                 tabStyle: {
//                     height: wp("14%"),
//                 },
//
//                 style: {
//                     height: DeviceInfo.hasNotch() ? wp("19%") : wp("15%"),
//                     backgroundColor: COLORS.white_color,
//                 },
//
//             }}>
//             <Tab.Screen name="Clients" component={Dashboard} options={{ title: "Clients" }} />
//             <Tab.Screen name="Photos" component={Photos} options={{ title: "Photos" }} />
//             <Tab.Screen name="Events" component={Events} options={{ title: "Events" }} />
//             <Tab.Screen name="Inbox" component={Inbox} options={{ title: "Inbox" }} />
//         </Tab.Navigator>
//     )
// }
//
//
// const AppNavigator = () => {
//     return (
//         <NavigationContainer>
//             <Stack.Navigator>
//                 <Stack.Screen options={{ headerShown: false }} name="OnboardingScreen" component={OnboardingScreen} />
//                 <Stack.Screen options={{ headerShown: false }} name="LoginScreen" component={LoginScreen} />
//                 <Stack.Screen options={{ headerShown: false }} name="ClientDetailsScreen" component={ClientDetailsScreen} />
//                 <Stack.Screen options={{ headerShown: false }} name="ProfileScreen" component={ProfileScreen} />
//                 <Stack.Screen options={{ headerShown: false }} name="CommentScreen" component={CommentScreen} />
//                 <Stack.Screen name="Tab" component={Tabnavigation} options={{ headerShown: false }} />
//                 <Stack.Screen options={{ headerShown: false }}  name="Dashboard" component={DrawerNavigator} />
//             </Stack.Navigator>
//         </NavigationContainer>
//     );
// }
//
//
// const DrawerScreens = ({ style }) => {
//     return (
//         <Stack.Navigator initialRouteName="Dashboard" headerMode="none">
//             <Stack.Screen options={{ headerShown: false }} name="Tab" component={Tabnavigation} />
//         </Stack.Navigator>
//     );
// };
//
//
// export default AppNavigator;
//
