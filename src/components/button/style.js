// import { AppColors, AppSpaces, AppStyles } from '../../constant';
import {StyleSheet} from 'react-native';
import {FONT_FAMILY} from '../../utils/Font';

/**
 * Define list of style sheet to design button contianer component.
 */
const container = StyleSheet.create({
  default: {
    flex: 1,
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});

/**
 * Define list of style sheet to design button title component.
 */
const title = StyleSheet.create({
  //   ...AppStyles.Font,
  default: {
    color: 'white',
    fontSize: 16,
    fontFamily: FONT_FAMILY.MontserratSemiBold,
  },
});

/**
 * Define list of style sheet to design button title component.
 */
const image = StyleSheet.create({
  default: {
    height: 27,
    width: 27,
  },
});

export {container, title, image};
