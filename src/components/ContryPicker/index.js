// import React, { useState } from 'react';
// import { TextInput, } from 'react-native-paper';
// import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
// import COLORS from '../../utils/Colors';
// import { FONT_FAMILY } from "../../utils/Font";
// import { FONT } from "../../utils/FontSize";
// import CountryPicker from 'react-native-country-picker-modal'
// import { View } from 'react-native';

// function CustomCountryPickerInput(props) {
//   const { label, value, onChangeText, secureTextEntry, disabled, input_back, backgroundColor, autoFocus, maxLength, keyboardType, handleChange } = props;

//   const [countryCode, setCountryCode] = useState('IN')
//   const [country, setCountry] = useState(null)
//   const [withCountryNameButton, setWithCountryNameButton] = useState(false)
//   const [withFlag, setWithFlag] = useState(true)
//   const [withEmoji, setWithEmoji] = useState(true)
//   const [withFilter, setWithFilter] = useState(true)
//   const [withAlphaFilter, setWithAlphaFilter] = useState(false)
//   const [withCallingCode, setWithCallingCode] = useState(`91`)

//   const onSelect = (country) => {
//     setCountryCode(country.cca2)
//     handleChange(country.cca2 == null ? 'in' : country.cca2)
//     setCountry(country)
//     setWithCallingCode(country.callingCode)
//   }
//   console.log(country)
//   return (
//     <View 
//     style={{
//       flexDirection: 'row', alignItems:'center',
//       // backgroundColor: input_back,
//       width: wp('90%'),
//       height: wp('11%'),
//       paddingVertical: wp('2%'),
//       fontFamily: FONT_FAMILY.BentonSansMedium,
//       fontSize: FONT.TextSmall,
//     }}
//     theme={{
//       roundness: wp('10%'),
//       colors: {
//         primary: COLORS.white_color,
//         text: COLORS.white_color,
//         placeholder: COLORS.white_color,
//         fontFamily: FONT_FAMILY.BentonSansMedium,
//         fontSize: FONT.TextSmall,
//       },
//     }}
//     >
//       <CountryPicker
//         {...{
//           countryCode,
//           withFilter,
//           withFlag,
//           withCountryNameButton,
//           withAlphaFilter,
//           withCallingCode,
//           withEmoji,
//           onSelect,
//         }}
//         handleChange={handleChange}
//       />
//       <TextInput
//         style={{
//           backgroundColor: input_back,
//           width: wp('80%'),
//           height: wp('11%'),
//           paddingVertical: wp('2%'),
//           fontFamily: FONT_FAMILY.BentonSansMedium,
//           fontSize: FONT.TextSmall,
//         }}
//         theme={{
//           roundness: wp('10%'),
//           colors: {
//             primary: COLORS.white_color,
//             text: COLORS.white_color,
//             placeholder: COLORS.white_color,
//             fontFamily: FONT_FAMILY.BentonSansMedium,
//             fontSize: FONT.TextSmall,
//           },
//         }}
//         mode='outlined'
//         label={label}
//         value={value}
//         onChangeText={onChangeText}
//         secureTextEntry={secureTextEntry}
//         disabled={disabled}
//         autoFocus={autoFocus}
//         maxLength={maxLength}
//         keyboardType={keyboardType}
//       // returnKeyType={'next'}
//       />
//     </View>
//   );
// };

// export default CustomCountryPickerInput;


import React, {useState, useRef} from 'react';
import {View, Text, Alert, StyleSheet, Pressable} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONT_FAMILY} from "../../utils/Font";
import {FONT} from "../../utils/FontSize";
import COLORS from '../../utils/Colors';

const CustomPhoneInput = (props) => {
  const {phoneNumber,onChangeFormattedText } = props;
  const phoneInput = useRef(null);

  // const [phoneNumber, setphoneNumber] = useState('');

  // const buttonPress = () => {
  //   Alert.alert(phoneNumber);
  // };
  return (
    // <View style={styles.container}>
      
    //   <Pressable style={styles.button} onPress={() => buttonPress()}>
    //     <Text style={styles.continueText}>Get Phone Number</Text>
    //   </Pressable>
    // </View>
    <PhoneInput
        ref={phoneInput}
        defaultValue={phoneNumber}
        defaultCode="IN"
        layout="first"
        containerStyle={{
          width: wp('90%'),
          height:  wp('11%'),
          borderRadius: wp('10%'),
          backgroundColor: "#FFD130",
          borderColor: COLORS.white_color,
          borderWidth: 1,
          zIndex: 0,
          marginTop: 15,
          marginBottom: 10,
          color: COLORS.white_color
        }}
        textContainerStyle={{
          paddingVertical: 0,
          borderRadius: wp('10%'),
          backgroundColor: "#FFD130",
          color: COLORS.white_color
        }}
        onChangeFormattedText={onChangeFormattedText}
      />
  );
};


export default CustomPhoneInput;