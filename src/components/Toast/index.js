import React from 'react';
import {Platform, Linking} from 'react-native';
import Snackbar from 'react-native-snackbar';
import COLORS from '../../utils/Colors';
import Toast from 'react-native-simple-toast';

export function MYTOAST(title) {
  Toast.show(title, Toast.LONG);
}

export function showToast(title) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      textColor: COLORS.white_color,
      backgroundColor: COLORS.off_grey,
      duration: Snackbar.LENGTH_LONG,
      action: {
        textColor: 'white',
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 5000);
  }
}

// ----------------------------------------

export function showToastSucess(title) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      textColor: COLORS.white_color,
      backgroundColor: COLORS.off_grey,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        textColor: 'white',
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 5000);
  }
}

// ----------------------------------------

export function showToastAlert(title) {
  if (Platform.OS === 'ios') {
    Snackbar.show({
      text: title,
      textColor: COLORS.white_color,
      backgroundColor: COLORS.failure_Toast,
      duration: Snackbar.LENGTH_SHORT,
      action: {
        textColor: COLORS.failure_Toast,
        onPress: () => {
          /* Do something. */
        },
      },
    });
  } else {
    Toast.show(title, 5000);
  }
}
