import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {StyleSheet, Platform} from 'react-native';
import COLORS from '../../../utils/Colors';

const styles = StyleSheet.create({
    mainContainer: {
        /*  paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,*/
        backgroundColor: COLORS.white_color,
        paddingVertical: wp(5),
    },
    childContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: wp(3),
    },
});

export default styles;
