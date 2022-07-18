import React, {Component} from 'react';
import {Image, View, Text, ImageBackground,TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {CommonActions,DrawerActions} from '@react-navigation/native';
import {FONT} from '../../utils/FontSize';
import {Spacer} from '../../components/spacer';
import COLORS from '../../utils/Colors';
import {ICONS} from '../../utils/ImagePaths';
import {NewPrimaryButton, PrimaryButton} from '../../components/buttons/PrimaryButton';
import {FONT_FAMILY} from '../../utils/Font';
import TopHeader from '../../components/header';
import {SafeAreaViewContainer, MainContainer, ScrollContainer} from '../../utils/BaseStyle';
import {connect} from "react-redux";
import BaseClass from "../../utils/BaseClass";


class homeScreen extends BaseClass {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        };
    }

    componentDidMount() {

    }


   Click() {
        const {navigation} = this.props;
        const {navigate} = navigation;
        navigate('Screen');
    }



    render() {
        const { navigation } = this.props;
        return (
            <>
                <TopHeader
                    backgroundColor={COLORS.app_theme_color}
                    text={"Home"}
                    onPressBackArrow={() => navigation.pop()}
                />
                <SafeAreaViewContainer style={{backgroundColor: COLORS.app_theme_color}}>
                    <ImageBackground source={ICONS.BACKGROUND_IMAGE}
                                     style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Spacer space={wp('5%')}/>
                        <View style={{flexDirection: 'column', width: wp(90), justifyContent: 'space-evenly'}}>
                            <Text style={{ fontSize: FONT.TextNormal_2,
                                color: COLORS.white_color,
                                textAlign: 'center',
                                fontFamily: FONT_FAMILY.BentonSansBold,}}>Welcome to Sparkseeker</Text>
                            <Spacer space={wp('3%')}/>
                            <TouchableOpacity
                                onPress={() => this.Click()}>
                            <Text
                               // onPress={() => this.Click()}>
                                style={{ fontSize: FONT.TextNormal_2,
                                color: COLORS.black_color,
                                textAlign: 'center',
                                fontFamily: FONT_FAMILY.BentonSansBold,}}>Click </Text>
                            </TouchableOpacity>

                        </View>
                        <Spacer space={3}/>
                    </ImageBackground>
                </SafeAreaViewContainer>
                </>
        );
    }

}

// ----------------------------------------
// ----------------------------------------
// CONNECT
// ----------------------------------------


const mapStateToProps = state => ({
    loginState: state.LoginReducer,
});

// ----------------------------------------

const mapDispatchToProps = (dispatch) => {
    return {
        loginApi: (payload) => dispatch(LoginAction(payload)),
    };
};

// ----------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(homeScreen);


