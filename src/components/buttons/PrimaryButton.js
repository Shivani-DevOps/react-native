// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------
import React, {Component} from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {View, Text, TouchableOpacity} from 'react-native';
// ----------------------------------------
// LOCAL IMPORTS
// ----------------------------------------
import COLORS from '../../utils/Colors';
//import {FONT_FAMILY} from '../../utils/Font';
import {FONT} from "../../utils/FontSize";
import {FONT_FAMILY} from '../../utils/Font';

//import ArrowForward from "../imageComponents/ArrowForward";


const PrimaryButton = (props) => {
    const {onPress, text, textColor, isNextIcon, bgColor, isDisabled} = props;
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{
                backgroundColor: bgColor,
                //width: wp(55),
                width: wp(60),
                paddingVertical: wp(4),
                borderRadius: wp(8),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }} onPress={onPress}>
            <Text style={{
                fontFamily: fontFamily ? fontFamily : FONT_FAMILY.BentonSansBlack,
                fontSize: FONT.TextNormal_2,
                color: textColor ? textColor : COLORS.white_color,
                width: wp(55),
                textAlign: 'center',
            }}>{text}</Text>
        </TouchableOpacity>

    );
};


const SecondaryButton = ({fontFamily,onPress, isCancel, text, bgColor, textColor, isDisabled, givenWidth}) => {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{
                borderColor: COLORS.black_color,
                borderWidth: isCancel ? 1 : 0,
                backgroundColor: bgColor,
                width: givenWidth,
                paddingVertical: wp(2),
                borderRadius: wp(1.5),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}
            onPress={onPress}
        >
            <Text style={{
                borderColor: COLORS.black_color,
                fontSize: FONT.TextSmall_2,
                color: COLORS.white_color,
                width: wp(27),
                textAlign: 'center',
            }}>{text}</Text>
        </TouchableOpacity>
    );
};

const PrimaryInput = ({onPress, isCancel, text, bgColor, textColor, isDisabled, givenWidth}) => {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{
                borderColor: COLORS.black_color,
                borderWidth: isCancel ? 0 : 0,
                backgroundColor: bgColor,
                width: givenWidth,
                paddingVertical: wp(2),
                borderRadius: wp(0.5),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}
            //  onPress={onPress}
        >
            <Text style={{
                paddingLeft: wp('2%'),
                // borderColor:  COLORS.black_color,
                fontSize: FONT.TextSmall_2,
                color: COLORS.black_color,
                width: wp(33),
                fontWeight: 'bold'
            }}>{text}</Text>
        </TouchableOpacity>
    );
};


const NewPrimaryButton = ({fontFamily, disabled, btnText, width, onPress, verticalPaddingWithText, borderRadius, borderColor, color, textColor, textSize, isTextBold}) => {
    return (
        <TouchableOpacity disabled={(disabled) ? disabled : false} activeOpacity={0.8} onPress={onPress}>
            <View style={{

                flexDirection: "row",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: (borderColor) ? borderColor : COLORS.transparent,
                backgroundColor: (color) ? color : COLORS.app_theme_color,
                borderRadius: (borderRadius) ? borderRadius : 0,
                width: (width) ? wp(`${width}%`) : wp('25%'),
                paddingVertical: (verticalPaddingWithText) ? wp(`${verticalPaddingWithText}%`) : wp('4%'),
            }}>
                <Text
                    style={{
                         fontFamily: fontFamily ? fontFamily : FONT_FAMILY.BentonSansBlack,
                        fontWeight: (isTextBold) ? 'bold' : 'normal',
                        color: (textColor) ? textColor : COLORS.white_color,
                        fontSize: textSize ? textSize : FONT.TextSmall,
                        textAlign:'center',


                    }}>{btnText}</Text>
            </View>
        </TouchableOpacity>
    );
};


const StatusButton = ({onPress, isCancel, text, bgColor, textColor, isDisabled, givenWidth}) => {
    return (
        <TouchableOpacity
            disabled={isDisabled}
            style={{
                borderColor: COLORS.black_color,
                borderWidth: isCancel ? 1 : 0,
                backgroundColor: bgColor,
                width: givenWidth,
                paddingVertical: wp(2),
                borderRadius: wp(1.5),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            }}
            onPress={onPress}
        >
            <Text style={{
                borderColor: COLORS.black_color,
                fontSize: FONT.TextSmall_2,
                color: COLORS.white_color,
                width: wp(27),
                textAlign: 'center',
            }}>{text}</Text>
        </TouchableOpacity>
    );
};


export {PrimaryButton, SecondaryButton, NewPrimaryButton, PrimaryInput,StatusButton};

