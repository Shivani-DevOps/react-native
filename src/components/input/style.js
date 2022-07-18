// import { AppColors, AppSpaces } from '../../constant';
import {StyleSheet} from 'react-native';
// import { AppHelper } from '../../utils';

/**
 * Define list of style sheet to design input container component.
 */
const container = StyleSheet.create({
  default: {
    height: 46,
    paddingStart: 15,
    paddingEnd: 15,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});

/**
 * Define list of style sheet to design input text component.
 */
const input = StyleSheet.create({
  default: {
    flex: 1,
    width: '100%',
    color: 'white',
    marginStart: 0,
    marginTop: 0,
    marginEnd: 0,
    marginBottom: 0,
  },
});

export {container, input};
