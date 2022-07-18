import React from 'react';
import {StyleSheet} from "react-native";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {FONT} from "../../utils/FontSize";
import {FONT_FAMILY} from "../../utils/Font";
import COLORS from "../../utils/Colors";

const styles = StyleSheet.create({
    headerStyle: {
        marginTop: wp(3),
        backgroundColor: 'rgb(68,107,204)',
        paddingVertical: wp(2),
        width: wp(55),
        borderBottomRightRadius: wp(12),
        borderTopRightRadius: wp(12),
        flexDirection: 'row'
    },
    imageStyle: {
        backgroundColor: COLORS.backGround_color,
        marginLeft: wp(3),
        width: wp(14),
        height: wp(14),
        borderRadius: wp(7)
    },
    textViewStyle: {
        width: wp(33)
    },
    textStyle1: {
        color: COLORS.black_color,
        lineHeight: wp(7),
        fontSize: FONT.TextSmall,
        fontWeight: 'bold',
        /* fontFamily: FONT_FAMILY.Montserrat*/
    },
    textStyle2: {
        color: COLORS.black_color,
        fontSize: FONT.TextSmall_2,
        fontWeight: 'bold',
        /*fontFamily: FONT_FAMILY.Montserrat*/
    },
    labelTextStyle: {
        color: COLORS.black_color,
        fontFamily:FONT_FAMILY.MontserratRegular,
        fontSize: FONT.TextMedium_2,
        right:wp(2)
    }

});

export {styles};
