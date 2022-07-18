import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, View, TouchableOpacity} from 'react-native';
import {Spacer} from '../../../components/spacer';
import COLORS from '../../../utils/Colors';
import {NewPrimaryButton} from '../../../components/buttons/PrimaryButton';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {FONT_FAMILY} from '../../../utils/Font';
import VideoPlayer from 'react-native-video-player';
import {OnBoardingVideoAction} from '../../../redux/actions/OnBoardingVideoAction';
import {SafeAreaViewContainer} from '../../../utils/BaseStyle';
import {CommonActions} from '@react-navigation/native';
import {Indicator, IndicatorAppearance} from '../../../components/indicator';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Onboarding({navigation}) {
  const vcRef = useRef();
  const [paused, setPaused] = useState(false);
  const [mute, setMute] = useState(false);
  const [videoUri, setvideoUri] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [isSubLoading, setIsSubLoading] = useState(false);
  const [showBottomButton, setShowBottomButton] = useState(false);

  // const componentDidMount = () => {
  //   const {navigation} = this.props;
  //   this._unsubscribe = navigation.addListener('focus', () => {
  //     onFocusFunction();
  //   });
  // }

  useEffect(() => {
    onFocusFunction();
  }, []);

  const onFocusFunction = async () => {
    setisLoading(true);
    OnBoardingVideoAction({}, response => boardingResponse(response));
  };

  const sparkClick = async () => {
    navigation.navigate('wizardScreen');
  };

  /**
   * It is used to render indicator UIs.
   */
  const renderIndicatorUIs = () => {
    return (
      <Indicator
        style={{alignSelf: 'center', flex: 1}}
        appearance={IndicatorAppearance.large}
        color={COLORS.app_theme_color}
      />
    );
  };

  /**
   * It is used to render indicator UIs.
   */
  const renderSubIndicator = () => {
    return (
      <Indicator
        style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
        appearance={IndicatorAppearance.large}
        color={COLORS.app_theme_color}
      />
    );
  };

  const boardingResponse = response => {
    //  console.warn('VideoResponse-->', response);
    setisLoading(false);

    setIsSubLoading(true);
    setTimeout(() => {
      setIsSubLoading(false);
    }, 2300);
    if (response.message !== 'Network Error') {
      const {code, message, data} = response;
      if (code === '200') {
        if (data && data.length > 0) {
          setvideoUri(data[0].url);
        }
        // MYTOAST(STRINGS.SIGNUP_SUCCESS)
      } else if (code === '409') {
        //  MYTOAST("An Account with given mail already exists")
      } else if (code === '422') {
        //  MYTOAST(message)
      } else {
        //   MYTOAST(message)
      }
    } else {
      //  MYTOAST(STRINGS.CHECK_INTERNET)
    }
  };

  /**
   * It is used to render video player UIs.
   */

  const renderUserDetailView = () => {
    return (
      // <View style={Styles.videoContainer}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          // marginTop:20
        }}>
        <VideoPlayer
          ref={vcRef}
          video={{
            uri:
              videoUri.length > 0
                ? videoUri
                : 'https://hackbuddy.s3.us-east-2.amazonaws.com/10+Sec+Vertical+Intro+After+effects+template+(online-video-cutter.com)+(2).mp4',
          }}
          videoWidth={windowWidth}
          videoHeight={windowHeight}
          // thumbnail={{
          //   uri: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fkubalubra.is%2Fwp-content%2Fuploads%2F2017%2F11%2Fdefault-thumbnail.jpg&imgrefurl=https%3A%2F%2Fkubalubra.is%2Fdefault-thumbnail%2F&tbnid=iBwkPVyfzII9PM&vet=12ahUKEwir1_eMkrjzAhUWkksFHSsvBMsQMyhOegUIARCPAQ..i&docid=cuN8eDBL7O3TPM&w=640&h=480&q=thumbnail%20%20image&ved=2ahUKEwir1_eMkrjzAhUWkksFHSsvBMsQMyhOegUIARCPAQ',
          // }}
          autoplay={true}
          //  paused={paused}
          muted={mute}
          resizeMode={'cover'}
          disableFullscreen
          customStyles={{
            controls: {opacity: 0},
            // wrapper: {zIndex: 900},
          }}
          onEnd={event => {
            console.log('event=== end', event);
            setShowBottomButton(true);
          }}
        />
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: 999,
          }}
          onPress={() => {
            setMute(!mute);
          }}></TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaViewContainer style={{backgroundColor: COLORS.black_color}}>
      {isLoading ? (
        renderIndicatorUIs()
      ) : (
        <View
          style={{
            flex: 1,
            // backgroundColor: COLORS.app_theme_color,
            // justifyContent: 'center',
            // alignItems:"center"
          }}>
          {renderUserDetailView()}
          {showBottomButton && (
            <View
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.48)',
                height: 97,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}>
              <NewPrimaryButton
                // onPress={() => navigation.navigate('Tabs')}
                onPress={() => sparkClick()}
                btnText={'LET’S CREATE SPARKS'}
                width={wp('15%')}
                fontFamily={FONT_FAMILY.BentonSansBold}
                borderRadius={wp(8)}
                verticalPaddingWithText={wp('0.6%')}
                textColor={COLORS.app_theme_color}
                color={'#FFFFFF'}
              />
            </View>
          )}
          {/* <Spacer space={3} /> */}
        </View>
      )}
      {isSubLoading && renderSubIndicator()}
    </SafeAreaViewContainer>
  );
}
