import React from 'react';
import {Text, View} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT} from '../../utils/FontSize';
import {Spacer} from '../../components/spacer';
import COLORS from '../../utils/Colors';
import {FONT_FAMILY} from '../../utils/Font';
import TopHeader from '../../components/header';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import {connect} from "react-redux";
import BaseClass from "../../utils/BaseClass";


class ShopScreen extends BaseClass {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
        };
    }

    componentDidMount() {

    }


    // Click() {
    //   const {navigation} = this.props;
    //   const {navigate} = navigation;
    //   navigate('Screen');
    // }


    render() {
        const {navigation} = this.props;
        return (
            <>
                <TopHeader
                    backgroundColor={COLORS.app_theme_color}
                    text={"Shop"}
                    onPressBackArrow={() => navigation.goBack()}
                />
                <SafeAreaViewContainer style={{}}>
                    {/*<ImageBackground source={ICONS.BACKGROUND_IMAGE}*/}
                    {/*                 style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>*/}
                    <Spacer space={wp('5%')}/>
                    <View style={{flexDirection: 'column', width: wp(90), justifyContent: 'space-evenly'}}>
                        <Text style={{
                            fontSize: FONT.TextNormal_2,
                            color: COLORS.app_theme_color,
                            textAlign: 'center',
                            fontFamily: FONT_FAMILY.BentonSansBold,
                        }}>Welcome to Shop Page Sparkseeker</Text>
                        <Spacer space={wp('3%')}/>
                        {/*<TouchableOpacity*/}
                        {/*    onPress={() => this.Click()}>*/}
                        {/*  <Text*/}
                        {/*      // onPress={() => this.Click()}>*/}
                        {/*      style={{ fontSize: FONT.TextNormal_2,*/}
                        {/*        color: COLORS.black_color,*/}
                        {/*        textAlign: 'center',*/}
                        {/*        fontFamily: FONT_FAMILY.BentonSansBold,}}>Click </Text>*/}
                        {/*</TouchableOpacity>*/}

                    </View>
                    <Spacer space={3}/>
                    {/*</ImageBackground>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(ShopScreen);


