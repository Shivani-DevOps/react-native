import * as React from 'react';
import { StyleSheet } from 'react-native'
import { TextInput, } from 'react-native-paper';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import COLORS from '../../utils/Colors';

const OtpInput = (props) => {
    const { value, onChangeText, secureTextEntry, disabled, backgroundColor,autoFocus,maxLength,keyboardType } = props;
    return (
        <TextInput
            style={{
                backgroundColor: {backgroundColor},
                width: wp('1%'),
                height: 15,
                margin: 10,

                // fontFamily: FONT_FAMIL   Y.BentonSansMedium,
                // fontSize: FONT.TextSmall,
            }}
            theme={{
                
                colors: {
                    primary: COLORS.white_color,
                    text: COLORS.white_color,
                    placeholder: COLORS.white_color,
                    // fontSize: FONT.TextHero,
                },
            }}
            left={'29'}
            mode='outlined'
            value={value}
            onChangeNum={onChangeNum}
            secureTextEntry={secureTextEntry}
            disabled={disabled}
            autoFocus = {autoFocus}
            maxLength = {maxLength}
            keyboardType = {keyboardType}
            // returnKeyType={'next'}
        />
    );
};

export default OtpInput;

