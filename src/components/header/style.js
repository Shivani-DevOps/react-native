import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {StyleSheet, Platform} from 'react-native';
import COLORS from '../../utils/Colors';

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: COLORS.backGround_color,
        paddingVertical: wp(3),
    },
    childContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: wp(3),
    },
});

export default styles;
