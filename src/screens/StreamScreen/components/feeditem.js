import React, {useState, useRef, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLORS from '../../../utils/Colors';
import {FONT_FAMILY} from '../../../utils/Font';
import VideoPlayer from 'react-native-video-player';
import moment from 'moment';

/**
 * It is used to dislay feed Item UIs.
 * @returns Render feed Item UIs.
 */
const FeedItem = props => {
  const {objVideo, key} = props;
  const [mute, setMute] = useState(true);
  const [paused, setPaused] = useState(false);
  const [thanked, setThanked] = useState(objVideo.isThanked);
  const [bookmarked, setBookmarked] = useState(objVideo.isBookmarked);
  //To hold reference
  const vcRef = useRef();

  useEffect(() => {
    // vcRef.current.resume();
    setThanked(objVideo.isThanked ? objVideo.isThanked : false);
    setBookmarked(objVideo.isBookmarked ? objVideo.isBookmarked : false);
    return () => {};
  }, []);

  /**
   * It is used to render user name UIs.
   */
  const renderUserDetailView = () => {
    const timeText = moment
      .utc(objVideo.createdAt)
      .local()
      .startOf('seconds')
      .fromNow();
    return (
      <View style={Styles.userDetailContainer}>
        <Image
          source={require('../../../assets/images/dummyUser.png')}
          style={Styles.userImage}
        />
        <View style={Styles.userNamesContainer}>
          <View style={{flexDirection: 'row'}}>
            <Text style={Styles.userNameText}>{objVideo.user.profileName}</Text>
            <Image
              source={require('../../../assets/images/checkMark.png')}
              style={Styles.checkMark}
            />
          </View>
          <Text style={Styles.addressText}>
            {timeText}, {objVideo.locationName}
          </Text>
        </View>
        <TouchableOpacity
          style={Styles.moreButtonContainer}
          // onPress={() => }
        >
          <Image
            // resizeMode={'stretch'}
            source={require('../../../assets/images/moreIcon.png')}
            style={{width: 23, height: 6, tintColor: COLORS.app_theme_color}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * It is used to render video player UIs.
   */
  const renderVideoPlayerUIs = () => {
    const videoUrl = objVideo.muxPlaybackId
      ? `https://stream.mux.com/${objVideo.muxPlaybackId}.m3u8`
      : objVideo.videoUrl;
    const thumbNailUrl = objVideo.muxPlaybackId
      ? {
          uri: `https://image.mux.com/${objVideo.muxPlaybackId}/thumbnail.png?width=1005&height=1341`,
        }
      : require('../../../assets/images/videoPlaceholder.png');
    // console.log('videoUrl======', videoUrl);
    return (
      // <View style={Styles.videoContainer}>
      <View style={Styles.videoContainer}>
        <VideoPlayer
          ref={vcRef}
          video={{
            uri: videoUrl,
          }}
          videoWidth={wp('89.33%')}
          videoHeight={wp('119%')}
          thumbnail={thumbNailUrl}
          endThumbnail={thumbNailUrl}
          endWithThumbnail
          autoplay={false}
          paused={paused}
          muted={mute}
          resizeMode={'cover'}
          pictureInPicture
          disableFullscreen
          pauseOnPress
          customStyles={{
            controls: {opacity: 0},
            // wrapper: {zIndex: 900},
            thumbnail: {resizeMode: 'contain'},
            // seekBar: {opacity: 0},
            // seekBarBackground: {backgroundColor: 'red'},
          }}
          onLoad={event => {
            // console.log('event===', event);
          }}
        />
        {/* <TouchableOpacity
          style={[
            Styles.playPuaseView,
            {zIndex: vcRef.current && vcRef.current.isPlaying ? 1000 : 500},
          ]}
          onPress={() => {
            console.log('setPaused(!pa');
            if (paused) {
              setPaused(false);
            } else {
              vcRef.current.resume();
            }
          }}></TouchableOpacity> */}
        {/* <Image
          // resizeMode={'stretch'}
          source={require('../../../assets/images/dummyVideoThumb.png')}
          style={Styles.videoThum}
        /> */}
        {/* <View style={Styles.playButtonContainer}>
          <Image
            // resizeMode={'stretch'}
            source={require('../../../assets/images/playIcon.png')}
            style={Styles.playButtonImage}
          />
        </View> */}
        {renderMotivationTextUIs()}
        {renderVideoButtonsContainerUIs()}
      </View>
    );
  };

  /**
   * It is used to render motivation text UIs.
   */
  const renderMotivationTextUIs = () => {
    return (
      <View style={Styles.motivationContainer}>
        <Text style={Styles.motivationText}>MOTIVATION</Text>
      </View>
    );
  };

  /**
   * It is used to render button container UIs.
   */
  const renderVideoButtonsContainerUIs = () => {
    return (
      <View style={Styles.buttonsContainer}>
        <TouchableOpacity style={Styles.buttons} onPress={() => setMute(!mute)}>
          <Image
            source={require('../../../assets/images/volume.png')}
            style={{width: 15, height: 13.5}}
          />
        </TouchableOpacity>
        <View
          style={{width: 1, backgroundColor: 'rgba(38, 39, 41, 0.13)'}}></View>
        <TouchableOpacity
          style={Styles.buttons}
          // onPress={() => }
        >
          <Image
            source={require('../../../assets/images/ccIcon.png')}
            style={{width: 16, height: 12}}
          />
        </TouchableOpacity>
        <View
          style={{width: 1, backgroundColor: 'rgba(38, 39, 41, 0.13)'}}></View>
        <TouchableOpacity
          style={Styles.buttons}
          onPress={() =>
            // console.log('more')
            {
              vcRef.current &&
                vcRef.current.state.isStarted &&
                vcRef.current.onToggleFullScreen();
              // vcRef.current && vcRef.current.onToggleFullScreen();
            }
          }>
          <Image
            source={require('../../../assets/images/fullScreen.png')}
            style={{width: 15, height: 15}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * It is used to render post details text UIs.
   */
  const renderPostDetailTextsUIs = () => {
    return (
      <View style={Styles.postsTextContainer}>
        <Text style={Styles.postTitleText}>{objVideo.title}</Text>
        <Text style={Styles.postSubtitleText}>{objVideo.caption}</Text>
        <Text style={Styles.postSubtitleText}>
          #Motivational #PowerOfChoice #PowerOfNow
        </Text>
      </View>
    );
  };

  /**
   * It is used to render post details text UIs.
   */
  const renderSeeAllResponses = () => {
    return (
      <TouchableOpacity
        style={Styles.seeAllResponseContainer}
        // onPress={() => }
      >
        <Text style={Styles.seeAllText}>
          See all{' '}
          <Text
            style={[
              Styles.seeAllText,
              {fontFamily: FONT_FAMILY.MontserratSemiBold},
            ]}>
            41
          </Text>{' '}
          video responses
        </Text>
      </TouchableOpacity>
    );
  };

  /**
   * It is used to render post details text UIs.
   */
  const resposesButtonContainer = () => {
    return (
      <View style={Styles.responsesContainer}>
        <View style={Styles.thanksShareButtonContainer}>
          <TouchableOpacity
            style={Styles.thanksButton}
            onPress={() => {
              ThankVideo(objVideo.id, response => {
                // console.log('ThankVideo response', response);
                if (response.status === 200) {
                  // showToastSucess(response.data.message);
                  setThanked(!thanked);
                } else if (response.data && response.data.message) {
                  showToastAlert(response.data.message);
                } else if (response && response.message) {
                  showToastAlert(response.message);
                }
              });
            }}>
            <Image
              source={require('../../../assets/images/thanksIcon.png')}
              style={{
                width: 19,
                height: 24,
                tintColor: thanked ? COLORS.app_theme_color : null,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.thanksButton}
            // onPress={() => }
          >
            <Image
              source={require('../../../assets/images/postVideoIcon.png')}
              style={{width: 24, height: 22}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.thanksButton}
            // onPress={() => }
          >
            <Image
              source={require('../../../assets/images/shareIcon.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </View>
        <Text style={Styles.promotedText}>PROMOTED</Text>
        <TouchableOpacity
          style={Styles.saveButton}
          onPress={() => {
            BookmarkVideo(objVideo.id, response => {
              // console.log('ThankVideo response', response);
              if (response.status === 200) {
                // showToastSucess(response.data.message);
                setBookmarked(!bookmarked);
              } else if (response.data && response.data.message) {
                showToastAlert(response.data.message);
              } else if (response && response.message) {
                showToastAlert(response.message);
              }
            });
          }}>
          <Image
            source={require('../../../assets/images/saveIcon.png')}
            style={{
              width: 18,
              height: 24,
              tintColor: bookmarked ? COLORS.app_theme_color : null,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * It is used to render views and likes UIs.
   */
  const viewsContainer = () => {
    return (
      <View style={Styles.viewsContainer}>
        <Text style={Styles.thanksText}>
          Thanks -{' '}
          <Text
            style={[
              Styles.thanksText,
              {fontFamily: FONT_FAMILY.MontserratSemiBold},
            ]}>
            54
          </Text>{' '}
          Sparkseekers
        </Text>
        <Text style={Styles.thanksText}>
          Views -{' '}
          <Text
            style={[
              Styles.thanksText,
              {fontFamily: FONT_FAMILY.MontserratSemiBold},
            ]}>
            1.5
          </Text>{' '}
          million
        </Text>
      </View>
    );
  };

  return (
    <View style={Styles.container} key={key}>
      {objVideo && (
        <>
          {objVideo.user && renderUserDetailView()}
          {renderVideoPlayerUIs()}
          {renderPostDetailTextsUIs()}
          {renderSeeAllResponses()}
          {resposesButtonContainer()}
          {viewsContainer()}
        </>
      )}
    </View>
  );
};

export default FeedItem;

import {StyleSheet} from 'react-native';
import {
  BookmarkVideo,
  ThankVideo,
} from '../../../redux/actions/FeedScreensActions';
import {showToastAlert, showToastSucess} from '../../../components/Toast';

/**
 * It is used to design feed item UIs.
 */
const Styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  userDetailContainer: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#FFFFFF',
  },
  userImage: {
    width: 44,
    height: 44,
  },
  userNameText: {
    color: '#262729',
    fontSize: 16,
    fontFamily: FONT_FAMILY.BentonSansMedium,
  },
  userNamesContainer: {
    marginLeft: 20,
    justifyContent: 'center',
    flex: 1,
  },
  addressText: {
    color: '#262729',
    fontSize: 10,
    fontFamily: FONT_FAMILY.MontserratRegular,
    opacity: 0.5,
    marginTop: 4,
    // textTransform: 'capitalize',
  },
  checkMark: {
    width: 12,
    height: 12,
    marginLeft: 11,
  },
  videoThum: {
    height: wp('119%'),
    width: wp('89.33%'),
  },
  playPuaseView: {
    height: wp('119%'),
    width: wp('89.33%'),
    // backgroundColor: 'red',
    zIndex: 1000,
    position: 'absolute',
  },
  videoContainer: {
    marginTop: 15,
    borderRadius: 6,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  moreButtonContainer: {
    height: 40,
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  playButtonContainer: {
    height: 48,
    width: 48,
    borderRadius: 24,
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  playButtonImage: {
    height: 30,
    width: 30,
  },
  motivationContainer: {
    height: 24,
    backgroundColor: '#262729',
    paddingHorizontal: 7,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    left: 10,
    zIndex: 1000,
  },
  motivationText: {
    color: COLORS.app_theme_color,
    fontSize: 17,
    fontFamily: FONT_FAMILY.MontserratSemiBold,
  },
  buttonsContainer: {
    height: 24,
    borderRadius: 5,
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    width: 152,
    backgroundColor: 'background: rgba(255, 255, 255, 0.78)',
    alignItems: 'stretch',
    borderBottomRightRadius: 20,
    justifyContent: 'space-evenly',
    zIndex: 1000,
  },
  buttons: {
    alignSelf: 'center',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    height: 22,
  },
  postsTextContainer: {
    marginTop: 10,
  },
  postTitleText: {
    color: '#262729',
    fontSize: 16,
    fontFamily: FONT_FAMILY.BentonSansMedium,
  },
  postSubtitleText: {
    color: '#262729',
    fontSize: 12,
    fontFamily: FONT_FAMILY.MontserratRegular,
    marginTop: 6,
  },
  seeAllResponseContainer: {
    height: 40,
    justifyContent: 'center',
  },
  seeAllText: {
    color: '#262729',
    fontSize: 12,
    fontFamily: FONT_FAMILY.MontserratRegular,
    opacity: 0.5,
  },
  responsesContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  thanksShareButtonContainer: {
    flexDirection: 'row',
    width: 152,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  thanksButton: {
    height: 40,
    width: 50,
    justifyContent: 'center',
  },
  promotedText: {
    color: COLORS.app_theme_color,
    fontSize: 13,
    fontFamily: FONT_FAMILY.MontserratSemiBold,
    textAlignVertical: 'center',
    marginRight: 2,
    flex: 1,
    textAlign: 'right',
  },
  saveButton: {
    height: 40,
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  viewsContainer: {
    justifyContent: 'space-between',
    marginTop: 10,
    flexDirection: 'row',
  },
  thanksText: {
    color: '#262729',
    fontSize: 12,
    fontFamily: FONT_FAMILY.MontserratRegular,
  },
});
