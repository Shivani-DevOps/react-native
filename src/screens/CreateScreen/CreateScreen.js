import React, {Component} from 'react';
import {Image, View, Text, ImageBackground} from 'react-native';
import {Spacer} from '../../components/spacer';
import COLORS from '../../utils/Colors';
import {ICONS} from '../../utils/ImagePaths';
import {NewPrimaryButton, PrimaryButton} from '../../components/buttons/PrimaryButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import {FONT_FAMILY} from '../../utils/Font';



export default function CreateScreen({ navigation }) {

    onSignupPress = () => {
        navigation.navigate('onboarding')
    };


    return (
        <ImageBackground source={ICONS.ONBOARDING_IMAGE}
                         style={{flex: 1, resizeMode:'contain',justifyContent: 'flex-end', alignItems: 'center'}}>
            {/* <Spacer space={wp('20%')}/> */}
            <View style={{marginTop: 10}}>

                <NewPrimaryButton
                    onPress={() =>  navigation.navigate('Tabs')}
                    btnText={'LET’S CREATE SPARKS'}
                    width={wp("15%")}
                    fontFamily={FONT_FAMILY.BentonSansBold}
                    borderRadius={wp(8)}
                    verticalPaddingWithText={wp("0.6%")}
                    textColor={COLORS.app_theme_color}
                    color={'#FFFFFF'}
                />
            </View>
            <Spacer space={3}/>
        </ImageBackground>
    );
}




