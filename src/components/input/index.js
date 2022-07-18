import React from 'react';

// import { AppColors, AppSpaces, AppStyles } from '../../constant';
import {TextInput, View, StyleSheet} from 'react-native';
// import {AppHelper} from '../../utils';

import PropTypes from 'prop-types';
import * as Styles from './style';
import {FONT_FAMILY} from '../../utils/Font';

/**
 * Define list of input auto capitalize types.
 */
export const InputAutoCapitalizeType = {
  characters: 'characters',
  words: 'words',
  sentences: 'sentences',
  none: 'none',
};

/**
 * Define list of input auto complete types.
 */
export const InputAutoCompleteType = {
  ccCSC: 'cc-csc',
  ccEXP: 'cc-exp',
  ccEXPMonth: 'cc-exp-month',
  ccEXPYear: 'cc-exp-year',
  ccNumber: 'cc-number',
  email: 'email',
  name: 'name',
  password: 'password',
  postalCode: 'postal-code',
  streetAddress: 'street-address',
  tel: 'tel',
  userName: 'username',
  off: 'off',
};

/**
 * Define list of input keyboard types.
 */
export const InputKeyboardType = {
  default: 'default',
  emailAddress: 'email-address',
  numeric: 'numeric',
  phonePad: 'phone-pad',
  numberPad: 'number-pad',
  decimalPad: 'decimal-pad',
  asciiCapable: 'ascii-capable',
  numbersAndPunctuation: 'numbers-and-punctuation',
  url: 'url',
  namePhonePad: 'name-phone-pad',
  twitter: 'twitter',
  webSearch: 'web-search',
};

/**
 * Define list of input return key types.
 */
export const InputReturnKeyType = {
  done: 'done',
  go: 'go',
  next: 'next',
  search: 'search',
  send: 'send',
};

/**
 * Define list of application global styles.
 */
const Container = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 7},
    shadowOpacity: 0.13,
    shadowRadius: 15,
    elevation: 8,
  },
  border: {
    borderColor: '#FFC700',
    borderWidth: 1,
  },
});

/**
 * It is used to render text component with list of props.
 */
const Input = props => {
  // Destructuring all the properties.
  const {
    inputRef,
    innerRef,
    isDisable,
    isEditable,
    isBorderVisible,
    isShadowVisible,
    marginStart,
    marginTop,
    marginEnd,
    marginBottom,
    secureTextEntry,
    containerStyle,
    backgroundColor,
    height,
    inputStyle,
    placeholder,
    placeholderTextColor,
    defaultValue,
    multiline,
    onChangeText,
    onSubmitEditing,
    errorText,
    errorTextColor,
  } = props;

  /**
   * It is used to render input component UIs, based on define list of dynamic styles for the input component.
   */
  const inputStyles = inputStyle
    ? [Styles.input.default, FONT_FAMILY.BentonSansMedium, inputStyle]
    : [Styles.input.default, FONT_FAMILY.BentonSansMed];
  const renderInputUIs = () => {
    return (
      <TextInput
        {...props}
        ref={inputRef}
        style={inputStyles}
        textAlignVertical={multiline ? 'top' : 'center'}
        pointerEvents={isDisable ? 'none' : 'auto'}
        placeholder={errorText ? errorText : placeholder}
        placeholderTextColor={errorText ? errorTextColor : placeholderTextColor}
        value={defaultValue}
        selectionColor={'white'}
        editable={isEditable}
        multiline={multiline}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
      />
    );
  };

  /**
   * Define list of dynamic style for the container component.
   */
  const containerStyles = containerStyle
    ? [Styles.container.default, containerStyle]
    : [Styles.container.default];
  if (multiline && height) {
    containerStyles.push({
      height,
      paddingTop: 13,
      paddingBottom: 13,
    });
  }
  if (isBorderVisible) {
    containerStyles.push(Container.border);
  }
  if (isShadowVisible) {
    // containerStyles.push(AppStyles.Container.shadow);
  }
  if (marginStart) {
    containerStyles.push({marginStart});
  }
  if (marginTop) {
    containerStyles.push({marginTop});
  }
  if (marginEnd) {
    containerStyles.push({marginEnd});
  }
  if (marginBottom) {
    containerStyles.push({marginBottom});
  }
  if (backgroundColor) {
    containerStyles.push({backgroundColor: backgroundColor});
  }
  return <View style={containerStyles}>{renderInputUIs()}</View>;
};

/**
 * It used to defines number of props-type, which are used in Input component.
 */
Input.propTypes = {
  inputRef: PropTypes.any,
  innerRef: PropTypes.func,
  isDisable: PropTypes.bool.isRequired,
  isEditable: PropTypes.bool,
  isBorderVisible: PropTypes.bool.isRequired,
  isShadowVisible: PropTypes.bool.isRequired,
  marginStart: PropTypes.number,
  marginTop: PropTypes.number,
  marginEnd: PropTypes.number,
  marginBottom: PropTypes.number,
  secureTextEntry: PropTypes.bool,
  containerStyle: PropTypes.any,
  backgroundColor: PropTypes.string,
  height: PropTypes.number,
  inputStyle: PropTypes.any,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  multiline: PropTypes.bool.isRequired,
  autoCapitalize: PropTypes.oneOf([
    InputAutoCapitalizeType.none,
    InputAutoCapitalizeType.characters,
    InputAutoCapitalizeType.words,
    InputAutoCapitalizeType.sentences,
  ]),
  autoCompleteType: PropTypes.oneOf([
    InputAutoCompleteType.ccCSC,
    InputAutoCompleteType.ccEXP,
    InputAutoCompleteType.ccEXPMonth,
    InputAutoCompleteType.ccEXPYear,
    InputAutoCompleteType.ccNumber,
    InputAutoCompleteType.email,
    InputAutoCompleteType.name,
    InputAutoCompleteType.off,
    InputAutoCompleteType.password,
    InputAutoCompleteType.postalCode,
    InputAutoCompleteType.streetAddress,
    InputAutoCompleteType.tel,
    InputAutoCompleteType.userName,
  ]),
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  keyboardType: PropTypes.oneOf([
    InputKeyboardType.default,
    InputKeyboardType.decimalPad,
    InputKeyboardType.asciiCapable,
    InputKeyboardType.emailAddress,
    InputKeyboardType.namePhonePad,
    InputKeyboardType.numberPad,
    InputKeyboardType.numbersAndPunctuation,
    InputKeyboardType.numeric,
    InputKeyboardType.phonePad,
    InputKeyboardType.twitter,
    InputKeyboardType.url,
    InputKeyboardType.webSearch,
  ]),
  returnKeyType: PropTypes.oneOf([
    InputReturnKeyType.done,
    InputReturnKeyType.go,
    InputReturnKeyType.next,
    InputReturnKeyType.search,
    InputReturnKeyType.send,
  ]),
  onChangeText: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  errorText: PropTypes.string,
  errorTextColor: PropTypes.string.isRequired,
};

/**
 * It used to defines number of props-type default value, which are used in Input component.
 */
Input.defaultProps = {
  isDisable: false,
  isBorderVisible: false,
  isShadowVisible: true,
  secureTextEntry: false,
  autoCapitalize: InputAutoCapitalizeType.none,
  placeholderTextColor: 'white',
  multiline: false,
  errorTextColor: 'red',
  isEditable: true,
};

export default Input;
