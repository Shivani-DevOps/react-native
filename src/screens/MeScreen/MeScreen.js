import React from 'react';
import {
  ImageBackground,
  LogBox,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import COLORS from '../../utils/Colors';
import Image from 'react-native-fast-image';
import {ICONS} from '../../utils/ImagePaths';
import {FONT_FAMILY} from '../../utils/Font';
import {FONT} from '../../utils/FontSize';
import {Spacer} from '../../components/spacer';
// import { ScrollView } from 'react-native-gesture-handler';
import BottomSheet from 'reanimated-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import BaseClass from '../../utils/BaseClass';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {GetProfileAction} from '../../redux/actions/GetProfile';
// import MasonryList from "react-native-masonry-list";
import AppConstant from '../../utils/constants';

const image = [
  {
    url: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?cs=srgb&dl=pexels-elina-fairytale-3822621.jpg&fm=jpg',
    height: 25,
  },
  {
    url: 'https://images.pexels.com/photos/3822646/pexels-photo-3822646.jpeg?cs=srgb&dl=pexels-elina-fairytale-3822646.jpg&fm=jpg',
    height: 65,
  },
  {
    height: 25,
    url: 'https://images.pexels.com/photos/3823075/pexels-photo-3823075.jpeg?cs=srgb&dl=pexels-elina-fairytale-3823075.jpg&fm=jpg',
  },
  {
    height: 55,
    url: 'https://images.pexels.com/photos/4708514/pexels-photo-4708514.jpeg?cs=srgb&dl=pexels-anthony-shkraba-4708514.jpg&fm=jpg',
  },
  {
    height: 35,
    url: 'https://images.pexels.com/photos/999309/pexels-photo-999309.jpeg?cs=srgb&dl=pexels-the-lazy-artist-gallery-999309.jpg&fm=jpg',
  },
  {
    height: 70,
    url: 'https://images.pexels.com/photos/4324101/pexels-photo-4324101.jpeg?cs=srgb&dl=pexels-cottonbro-4324101.jpg&fm=jpg',
  },
  {
    height: 75,
    url: 'https://images.pexels.com/photos/374632/pexels-photo-374632.jpeg?cs=srgb&dl=pexels-burst-374632.jpg&fm=jpg',
  },
  {
    height: 85,
    url: 'https://images.pexels.com/photos/2597205/pexels-photo-2597205.jpeg?cs=srgb&dl=pexels-felipe-borges-2597205.jpg&fm=jpg',
  },
  {
    height: 95,
    url: 'https://images.pexels.com/photos/2018242/pexels-photo-2018242.jpeg?cs=srgb&dl=pexels-lucas-pezeta-2018242.jpg&fm=jpg',
  },
];

class MeScreen extends BaseClass {
  constructor(props) {
    sheetRef = React.createRef();
    super(props);
    LogBox.ignoreAllLogs();
    this.state = {
      profileData: {},
    };
  }

  componentWillReceiveProps = nextProps => {
    console.log('test++', nextProps.ProfileState.data.length);
    this.setState({
      profileData:
        nextProps.ProfileState.data.length !== 0 &&
        nextProps.ProfileState.data[0],
    });
  };

  componentDidMount = async () => {
    const deviceToken = await AsyncStorage.getItem('authToken');
    this.props.getProfile({
      userName: AppConstant.shared.globalStoredUserInfo.username,
      access_token: deviceToken,
    });
  };

  renderContent = () => (
    <View
      style={{
        backgroundColor: '#fff',
        height: 331,
        width: wp('100%'),
      }}>
      <TouchableOpacity>
        <Image
          source={ICONS.DRAG_HANDLE}
          style={{marginLeft: '43%', marginTop: '7%'}}
        />
      </TouchableOpacity>

      <View
        style={{
          // backgroundColor:"red",
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: wp('6%'),
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.BentonSans,
            fontSize: FONT.TextSmall_2,
            color: '#262729',
          }}>
          Change Your Profile
        </Text>
        <Text
          style={{
            fontFamily: FONT_FAMILY.BentonSans,
            fontSize: FONT.TextSmall_2,
            color: COLORS.off_red,
          }}
          onPress={() => sheetRef.current.snapTo(0)}>
          cancel
        </Text>
      </View>
      <View
        style={{
          paddingLeft: '6%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={ICONS.GROUP}
          style={{
            height: hp(4.6),
            width: wp(10.5),
            borderBottomRightRadius: 5,
          }}
        />
        <Spacer row={2} />
        <Text style={{fontFamily: FONT_FAMILY.BentonSans, fontSize: 16}}>
          Kalista{' '}
        </Text>
      </View>
      <Spacer space={2} />
      <View style={{borderBottomColor: 'gray', borderBottomWidth: 1}} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          padding: wp('4%'),
          paddingLeft: '6%',
          alignItems: 'center',
        }}>
        <Image
          source={ICONS.GROUP_2}
          style={{
            height: hp(4.6),
            width: wp(10.5),
            borderBottomRightRadius: 5,
          }}
        />
        <Spacer row={2} />
        <Text style={{fontFamily: FONT_FAMILY.BentonSans, fontSize: 16}}>
          Kalista{' '}
        </Text>
      </TouchableOpacity>
      <Spacer space={2} />
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: '7%',
          alignItems: 'center',
        }}>
        <Image source={ICONS.ME} style={{height: 24, width: 24}} />
        <Spacer row={3} />
        <Text style={{fontFamily: FONT_FAMILY.BentonSans, fontSize: 16}}>
          Add Account{' '}
        </Text>
      </TouchableOpacity>
      {/* 
      <View
        style={{
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          flexDirection: 'row',
          marginTop: '10%',
        }}>
        <Image source={ICONS.EDIT_PROFILE} />
        <Image source={ICONS.CIRCLES} />
        <Image source={ICONS.INSIGHTS_COPY} />
        <Image source={ICONS.MESSAGE} />
        <Image source={ICONS.NOTIFICATION} />
      </View> */}
    </View>
  );

  render() {
    const {profileData} = this.state;
    return (
      <>
        <ScrollView
          style={{flex: 1}}
          scrollEnabled={true}
          nestedScrollEnabled={true}>
          <ImageBackground
            source={{uri: profileData.backgroundImage}}
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'center',
              height: hp(40),
              width: '100%',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                height: '20%',
                width: '100%',
                justifyContent: 'flex-start',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  marginTop: '5%',
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      marginLeft: wp(3.5),
                      fontFamily: FONT_FAMILY.MontserratBlack,
                      fontWeight: 'bold',
                      fontSize: FONT.TextMedium_2,
                      color: COLORS.white_color,
                    }}>
                    {profileData.username}{' '}
                  </Text>
                  <Spacer row={2} />
                  <Image
                    source={ICONS.CHECK_MARK}
                    style={{height: 24, width: 24}}
                  />
                  <Spacer row={2} />
                  <Pressable
                    style={{margin: 5}}
                    onPress={() => sheetRef.current.snapTo(1)}>
                    <Image
                      source={ICONS.DROP}
                      style={{height: 24, width: 24}}
                    />
                  </Pressable>
                </View>
                <Spacer row={1} />
                <TouchableOpacity
                  style={{width: wp(50)}}
                  onPress={() =>
                    this.props.navigation.navigate('settingsScreen')
                  }>
                  <Image
                    source={ICONS.SETTINGS}
                    style={{alignSelf: 'flex-end', height: 24, width: 24}}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '3%',
                flexDirection: 'column',
              }}>
              <Image
                source={{uri: profileData.profileImage}}
                style={{
                  marginTop: wp(11),
                  height: wp(30),
                  width: wp(30),
                  borderRadius: wp(2),
                }}
              />
              <Spacer space={2.6} />
              <Text
                style={{
                  fontFamily: FONT_FAMILY.MontserratBlack,
                  fontSize: FONT.TextMedium_2,
                  color: COLORS.profile_text,
                }}>
                {profileData.email}
              </Text>
            </View>
          </ImageBackground>
          <Spacer space={2} />
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.Montserrat,
                fontSize: FONT.TextSmall,
                lineHeight: wp(4),
                //   color: COLORS.profile_text,
                fontWeight: 'normal',
                color: '#262729',
              }}>
              {profileData.firstName} {profileData.lastName}
            </Text>
            <Text
              style={{
                fontWeight: 'normal',
                fontFamily: FONT_FAMILY.Montserrat,
                fontSize: FONT.TextSmall,
                lineHeight: wp(8),
                //  color: COLORS.profile_text,
                color: '#262729',
              }}>
              {profileData.email}
            </Text>
          </View>
          <Spacer space={2} />
          <Text
            style={{
              lineHeight: wp(6),
              fontFamily: FONT_FAMILY.Montserrat,
              fontSize: FONT.textSmall1,
              paddingHorizontal: wp(4),
              color: '#262729',
            }}>
            {profileData.bio}
          </Text>
          <Spacer space={2} />
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingHorizontal: wp(5),
              paddingVertical: wp(4),
              backgroundColor: COLORS.white_color,
              flexDirection: 'row',
              marginTop: '5%',
            }}>
            <Image
              source={ICONS.EDIT_PROFILE}
              style={{height: 24, width: 24}}
            />
            <Image source={ICONS.CIRCLES} style={{height: 24, width: 24}} />
            <Image
              source={ICONS.INSIGHTS_COPY}
              style={{height: 24, width: 24}}
            />
            <Image source={ICONS.MESSAGE} style={{height: 24, width: 24}} />
            <Image
              source={ICONS.NOTIFICATION}
              style={{height: 24, width: 24}}
            />
          </View>
          <Spacer space={1.5} />
          <View style={{backgroundColor: '#F2F2F2'}}>
            <View style={{flexDirection: 'row', paddingLeft: wp(6)}}>
              <Image source={ICONS.BOOKMARK} style={{height: 24, width: 24}} />
              <Text
                style={{
                  textAlign: 'center',
                  width: wp(80),
                  fontSize: wp(6),
                  color: '#262729',
                  fontWeight: 'bold',
                  fontFamily: FONT_FAMILY.BentonSans,
                  alignSelf: 'flex-end',
                }}>
                My Sparks
              </Text>
            </View>
            <Spacer space={1.5} />
            <View style={{flexDirection: 'row', width: wp(100)}}>
              <View
                style={{
                  paddingLeft: wp(1),
                  alignItems: 'flex-start',
                  width: wp(50),
                }}>
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[0].height),
                  }}
                  source={{uri: image[0].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[1].height),
                  }}
                  source={{uri: image[1].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[2].height),
                  }}
                  source={{uri: image[2].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[3].height),
                  }}
                  source={{uri: image[3].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[4].height),
                  }}
                  source={{uri: image[4].url}}
                />
              </View>
              <View
                style={{
                  paddingRight: wp(1),
                  alignItems: 'flex-end',
                  width: wp(50),
                }}>
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[4].height),
                  }}
                  source={{uri: image[5].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[3].height),
                  }}
                  source={{uri: image[6].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[2].height),
                  }}
                  source={{uri: image[7].url}}
                />
                <Image
                  style={{
                    marginBottom: wp(1),
                    width: wp(48.5),
                    height: wp(image[1].height),
                  }}
                  source={{uri: image[1].url}}
                />
              </View>
            </View>
            {/* <MasonryList  scrollEnabled={false} images={image}
                        /> */}
          </View>
          <View></View>
        </ScrollView>
        <BottomSheet
          ref={sheetRef}
          snapPoints={[0, 331, 300, 0]}
          borderRadius={20}
          renderContent={this.renderContent}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  ProfileState: state.ProfileReducer.profileResponse,
});

// ----------------------------------------

const mapDispatchToProps = dispatch => {
  return {
    getProfile: payload => dispatch(GetProfileAction(payload)),
  };
};

// ----------------------------------------

export default connect(mapStateToProps, mapDispatchToProps)(MeScreen);
