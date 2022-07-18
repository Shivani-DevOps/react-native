import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {StyleSheet, Text, View, Image} from 'react-native';

// import { navigationRef } from "../../RootNavigation";
// import Animated from "react-native-reanimated";
// import Onboarding from '../screens/auth/signup/Onboarding';
import {ICONS} from '../utils/ImagePaths';
// import Seek from '../assets/images/Seek';
// import Stream from '../assets/images/Stream';
// import Shop from '../assets/images/Shop';
// import Me from '../assets/images/Me';
// import Create from '../assets/images/Create';
// import styles from '../components/header/style';
import CreateScreen from '../screens/CreateScreen';
import MeScreen from '../screens/MeScreen/MeScreen';
import SeekScreen from '../screens/SeekScreen/SeekScreen';
import ShopScreen from '../screens/ShopScreen/ShopScreen';
import StreamScreen from '../screens/StreamScreen/StreamScreen';

const Tab = createBottomTabNavigator();

// const CustomTabBarButton = ({ children, onPress }) => (
//     <TouchableOpacity>
//         style={{
//             top: -30,
//             justifyContent: 'center',
//             alignItems: 'center',
//             ...styles.shadow
//         }}
//         onPress={onPress}
//         <View style={{
//             width: 70,
//             height: 70,
//             borderRadius: 35,
//             backgroundColor: '#FFC20F'
//         }}>
//             {children}
//         </View>

//     </TouchableOpacity>
// )

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, unmountOnBlur: false}}
      initialRouteName={'Stream'}
      tabBarOptions={{
        showLabel: false,
        style: {
          // padding: 10,
          position: 'absolute',
          bottom: 25,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: '#fff',
          boarderRadius: 15,
          height: 90,
          // ...styles.shadow
        },
      }}>
      <Tab.Screen
        name="Stream"
        component={StreamScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={ICONS.STREAM_IMAGE}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FFC20F' : '#828282',
                }}
              />
              <Text
                style={{color: focused ? '#FFC20F' : '#828282', fontSize: 12}}>
                stream
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Seek"
        component={SeekScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={ICONS.SEEK_IMAGE}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FFC20F' : '#828282',
                }}
              />
              <Text
                style={{color: focused ? '#FFC20F' : '#828282', fontSize: 12}}>
                Seek
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Create"
        component={CreateScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={ICONS.CREATE_IMAGE}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FFC20F' : '#828282',
                }}
              />
              <Text
                style={{color: focused ? '#FFC20F' : '#828282', fontSize: 12}}>
                Create
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wizard"
        component={ShopScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={ICONS.SHOP_IMAGE}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? '#FFC20F' : '#828282',
                }}
              />
              <Text
                style={{color: focused ? '#FFC20F' : '#828282', fontSize: 12}}>
                Shop
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Me"
        component={MeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
              }}>
              <Image
                source={{
                  uri: 'https://images.pexels.com/photos/1051838/pexels-photo-1051838.jpeg?cs=srgb&dl=pexels-prasanth-inturi-1051838.jpg&fm=jpg',
                }}
                style={{
                  width: 20,
                  height: 20,
                  // tintColor: focused ? '#FFC20F' : '#828282',
                }}
              />
              <Text
                style={{color: focused ? '#FFC20F' : '#828282', fontSize: 12}}>
                Me
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  Shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default MyTabs;
