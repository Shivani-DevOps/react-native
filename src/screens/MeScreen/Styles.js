import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {StyleSheet, Platform, Dimensions} from 'react-native';
import COLORS from '../../utils/Colors';

const Styles = StyleSheet.create({
    header: {
        /*  paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,*/
        backgroundColor: COLORS.profile_back,
        // height: Dimensions.get('screen').height,
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    headertext: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        letterSpacing: 1,


    }
});
export default Styles;
