import React, {Component} from 'react';
import {ImageBackground, StatusBar, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native';
import {FONT} from '../../../utils/FontSize';
import {Spacer} from '../../../components/spacer';
import COLORS from '../../../utils/Colors';
import {ICONS} from '../../../utils/ImagePaths';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import {FONT_FAMILY} from '../../../utils/Font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstant from '../../../utils/constants';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
    };
  }

  componentDidMount() {
    // AsyncStorage.getItem('userDetail', (error, result) => {
    //   console.warn('resu', result);
    //   AppConstant.shared.globalStoredUserInfo = JSON.parse(result);
    //   if (result !== undefined && result !== null) {
    //     let loginData = JSON.parse(result);
    //     setTimeout(() => {
    //       this.props.navigation.dispatch(
    //         CommonActions.reset({
    //           index: 0,
    //           routes: [
    //             {
    //               name: 'Tabs',
    //               params: {data: {edit: false}},
    //             },
    //           ],
    //         }),
    //       );
    //     }, 500);
    //   }
    // });
  }

  onLoginPress = () => {
    const {navigation} = this.props;
    const {navigate} = navigation;
    navigate('login');
  };

  onSignupPress = () => {
    this.props.navigation.navigate('signup');
    // this.props.navigation.navigate('Tabs')
  };

  render() {
    return (
      <>
        <StatusBar hidden={true} />
        <ImageBackground
          source={ICONS.BACKGROUND_IMAGE}
          style={{
            //flex: 1,
            //    justifyContent: 'flex-end',
            alignItems: 'center',
            height: hp('100%'),
          }}>
          <Spacer space={wp('23.5%')} />
          <View
            style={{
              flexDirection: 'row',
              width: wp('70%'),
              justifyContent: 'space-evenly',
            }}>
            <NewPrimaryButton
              onPress={() => this.onLoginPress()}
              fontFamily={FONT_FAMILY.BentonSansBold}
              fontSize={FONT.TextSmall}
              btnText={'LOG IN'}
              width={wp(6)}
              //  borderColor={COLORS.app_theme_color}
              borderRadius={wp(8)}
              verticalPaddingWithText={2}
              textColor={COLORS.app_theme_color}
              color={'#FFFFFF'}
            />
            <NewPrimaryButton
              onPress={() => this.onSignupPress()}
              fontFamily={FONT_FAMILY.BentonSansBold}
              fontSize={FONT.TextSmall}
              btnText={'SIGN UP'}
              width={wp(6)}
              color={'#FFFFFF'}
              // borderColor={COLORS.app_theme_color}
              borderRadius={wp(8)}
              verticalPaddingWithText={2}
              textColor={COLORS.app_theme_color}
            />
          </View>
          <Spacer space={wp('2%')} />
        </ImageBackground>
      </>
    );
  }
}

export default Splash;
