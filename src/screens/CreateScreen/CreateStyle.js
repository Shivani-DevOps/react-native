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
    backgroundColor: COLORS.app_theme_color,
    flex: 1,
    marginTop: Platform.OS == 'android' ? 43 : 0,
  },
  image: {
    alignSelf: 'center',
    height: wp(12),
    width: wp(9.5),
    marginTop: 20,
  },
  createText: {
    textAlign: 'center',
    color: COLORS.white_color,
    fontSize: wp(6),
    lineHeight: wp(8),
    fontFamily: FONT_FAMILY.BentonSans,
  },
});
export default Styles;
