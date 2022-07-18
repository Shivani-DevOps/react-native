import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import COLORS from '../../utils/Colors';
import {FONT_FAMILY} from '../../utils/Font';

const Styles = StyleSheet.create({
  container: {
    // backgroundColor: COLORS.app_theme_color,
    flex: 1,
    justifyContent: 'space-between',
  },
  bgImage: {
    width: hp('100%'),
    height: '100%',
    position: 'absolute',
  },
  formContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.48)',
    height: 570,
    paddingHorizontal: 20,
    paddingTop: 10,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  tagsContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  sparkTagText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONT_FAMILY.MontserratSemiBold,
  },
  tagText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: FONT_FAMILY.BentonSansMedium,
    paddingRight: 17,
  },
  mainTagsContainer: {
    flexDirection: 'row',
    paddingTop: 8,
  },
  shareToText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: FONT_FAMILY.MontserratSemiBold,
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  buttonMainContainer: {
    flexDirection: 'row',
    flex: 1,
    // backgroundColor: 'red',
    justifyContent: 'space-between',
  },
  buttons: {
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  shareContainer: {},
});
export default Styles;
