import * as React from 'react';
import {TextInput} from 'react-native-paper';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import COLORS from '../../utils/Colors';
import {FONT_FAMILY} from '../../utils/Font';
import {FONT} from '../../utils/FontSize';

const CustomInput = props => {
  const {
    label,
    value,
    onChangeText,
    secureTextEntry,
    disabled,
    input_back,
    backgroundColor,
    autoFocus,
    maxLength,
    keyboardType,
    returnKeyType,
  } = props;
  return (
    <TextInput
      style={{
        backgroundColor: input_back,
        width: wp('90%'),
        height: wp('11.5%'),
        paddingVertical: wp('2%'),
        fontFamily: FONT_FAMILY.BentonSansMedium,
        fontSize: FONT.TextSmall,
      }}
      theme={{
        roundness: wp('10%'),
        colors: {
          primary: COLORS.white_color,
          text: COLORS.white_color,
          placeholder: COLORS.white_color,
          fontFamily: FONT_FAMILY.BentonSansMedium,
          fontSize: FONT.TextSmall,
        },
      }}
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      disabled={disabled}
      autoFocus={autoFocus}
      maxLength={maxLength}
      keyboardType={keyboardType}
      returnKeyType={returnKeyType}
    />
  );
};

export default CustomInput;
