// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Keyboard,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Header, Icon, SearchBar} from 'react-native-elements';

// ----------------------------------------
// LOCAL IMPORTS
// ----------------------------------------

import style from './style';
import BackArrow from '../../components/imageComponents/ArrowBack';
//import {FONT_FAMILY} from "../../utils/Font";
import {FONT} from '../../utils/FontSize';
import COLORS from '../../utils/Colors';
import {ICONS} from '../../utils/ImagePaths';
import YZBackHandler from '../../utils/yzbackhandler';

const TopHeader = props => {
  const {
    searchImage,
    searchText,
    backgroundColor,
    onPressBackArrow,
    searchVisible,
    onPressSearchIcon,
    onPressSearchClose,
    isTripleDot,
    isBlock,
    onMenuPress,
    text,
    isDrawer,
    image,
    isRight,
    onRightArrow,
    rightViewImage,
    isHoldPhysicalBack,
  } = props;

  /**
   * It will handle android back handler event.
   */
  function addBackHandlerEvents() {
    return (
      <YZBackHandler
        isLoading={isHoldPhysicalBack}
        onPress={() => {
          Keyboard.dismiss();
          onPressBackArrow();
        }}
      />
    );
  }
  return (
    <>
      <Header
        containerStyle={{
          backgroundColor: backgroundColor,
          justifyContent: 'space-around',
          alignItems: 'center',
          borderBottomWidth: 0,
          borderBottomColor: 'transparent',
        }}
        /*containerStyle={{
                alignItems:'center',
                backgroundColor:'pink',
                borderBottomWidth: 0,
                borderBottomColor: 'transparent',
                //paddingTop: Platform.OS === 'ios' ? 0 : 25,
                //height: Platform.OS === 'ios' ? 60 : StatusBar.currentHeight + 60,
            }}*/
        // backgroundColor={COLORS.black_color}
        barStyle={'light-content'}
        statusBarProps={{
          translucent: true,
          backgroundColor: COLORS.transparent,
        }}
        rightComponent={
          <>
            {searchImage ? (
              searchVisible ? (
                <TouchableOpacity onPress={onPressSearchClose}>
                  <Image
                    style={{height: 30, width: 30}}
                    source={
                      rightViewImage ? rightViewImage : ICONS.CROSS_BLACK_ICON
                    }
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={onPressSearchIcon}>
                  <Image source={ICONS.SEARCH_ICON} />
                </TouchableOpacity>
              )
            ) : null}
          </>
        }
        leftComponent={
          <TouchableOpacity onPress={onPressBackArrow}>
            {addBackHandlerEvents()}
            {isDrawer ? (
              <Image style={{marginLeft: 10}} source={ICONS.DASHBOARD_ICON} />
            ) : (
              <Image
                style={{marginLeft: 10, width: 12, height: 24}}
                source={ICONS.BACK_ICON}
              />
            )}
          </TouchableOpacity>
        }
        centerComponent={{
          text: text,
          style: {
            //   fontFamily: FONT_FAMILY.PoppinsSemiBold,
            fontSize: FONT.TextMedium,
            fontStyle: 'normal',
            color: COLORS.white_color,
          },
        }}
      />
    </>
  );
};

export default TopHeader;
