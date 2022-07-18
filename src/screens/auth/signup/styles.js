import React from 'react';
import {heightPercentageToDP as hp, widthPercentageToDP as wp,} from 'react-native-responsive-screen';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import COLORS from '../../../utils/Colors';
import {FONT_FAMILY} from '../../../utils/Font';
import {FONT} from '../../../utils/FontSize';

const Styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        // paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,
        backgroundColor: COLORS.app_theme_color,
        height: Dimensions.get('window').height,
        // paddingVertical: wp(5),
        //  justifyContent: 'space-between'
    },
    mainContainer1: {
        flex: 1,
        /*  paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,*/
        backgroundColor: COLORS.app_theme_color,
        height: Dimensions.get('screen').height,
        // paddingVertical: wp(5),
        // justifyContent: 'space-between'
    },
    // childContainer: {
    //     alignItems: 'center',
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     paddingHorizontal: wp(3),
    // },

    mainContainer2: {
        flex: 1,
        //  paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,
        backgroundColor: COLORS.blue_color,
        // height: Dimensions.get('screen').height,
        // paddingVertical: wp(5),
        height: Dimensions.get('screen').height,
        justifyContent: 'space-between',
    },
    mainContainer3: {
        flex: 1,
        // paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,
        height: Dimensions.get('window').height,

        /*  paddingTop: Platform.OS == 'ios' ? wp(0) : StatusBar.currentHeight,*/
        backgroundColor: COLORS.blue_color,
        justifyContent: 'space-between',
    },
    touchable: {
        // alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: wp('90%'),
        borderColor: '#fff',
        // color:"#fff",
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: wp('3%'),
        opacity: 0.8,
        marginTop: wp('5%'),
        height: wp('11.5%'),
        paddingVertical: Platform.OS === 'android' ? wp('3%') : wp('3.5%'),

        //  paddingVertical: wp('2%'),
        backgroundColor: COLORS.input_back,
    },
    touchable1: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: wp('90%'),
        borderColor: '#fff',
        borderRadius: 50,
        borderWidth: 1,
        paddingHorizontal: wp('3%'),
        opacity: 0.8,
        marginTop: wp('5%'),
        height: wp('11.5%'),
        paddingVertical: Platform.OS === 'android' ? wp('3%') : wp('3.5%'),
        backgroundColor: COLORS.input_back1,
    },
    txt: {
        height: wp('20%'),
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: FONT.TextSmall,
        color: COLORS.white_color,
        textAlign: "center",
        // textAlign: 'center',
        fontFamily: FONT_FAMILY.BentonSansRegular,
    },

    view: {
        backgroundColor: '#fff',
        height: hp('65%'),
        justifyContent: 'space-between',
    },

    text: {
        fontSize: 18,
        padding: 10,
    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    view3: {
        padding: 20,
        alignItems: 'center',
    },

    text2: {
        fontSize: 16,
        padding: 10,
    },
});

export default Styles;
