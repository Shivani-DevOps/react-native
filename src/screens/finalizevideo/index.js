import React, {useRef, useEffect} from 'react';
import {Image, View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {Spacer} from '../../components/spacer';
import BaseClass from '../../utils/BaseClass';
import styles from './styles';
import Button from '../../components/button';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import {OpenImagePickerLibrary} from '../../components/image-picker-helper';
import TopHeader from '../../components/header';
import COLORS from '../../utils/Colors';
import {EventRegister} from 'react-native-event-listeners';
import {createThumbnail} from 'react-native-create-thumbnail';

import Input, {
  InputAutoCompleteType,
  InputKeyboardType,
  InputReturnKeyType,
} from '../../components/input';
import KeyboardAwareScrollView from '../../components/keyboardawarescrollview';
import {UploadVideoAction} from '../../redux/actions/UploadVideoAction';
import {showToastAlert, showToastSucess} from '../../components/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Indicator, IndicatorAppearance} from '../../components/indicator';
import {CommonActions} from '@react-navigation/routers';
import {RemoveAllStoredDataFromAsyncStorage} from '../../utils/constants';

const FinalizeVideoFromScreen = ({route, navigation}) => {
  const {userAvtar} = route.params;

  const refTitle = React.useRef();
  const refCaption = React.useRef();
  const refPlace = React.useRef();
  const refAddSparkTag = React.useRef();

  //Holds dynamic inputs using states.
  const [thumbnail, setThumbnail] = React.useState(null);
  const [formInfo, setFormInfo] = React.useState({
    placeholder: {
      title: 'Add a Title',
      caption: 'Add a Caption',
      place: 'Atlanta, Georgia',
      addSparkTag: 'Add Spark Tags',
    },
    value: {
      title: null,
      caption: null,
      place: 'Atlanta, Georgia',
      addSparkTag: null,
    },
    errorMessage: '',
    isValid: false,
    isLoading: false,
  });

  // useEffect(() => {
  //   createThumbnail({
  //     url: userAvtar.uri,
  //     timeStamp: 10000,
  //     format: 'png',
  //   })
  //     .then(response => {
  //       response.path && setThumbnail(response.path);
  //       console.log('response ==thumbnail ===', {response});
  //     })
  //     .catch(err => console.log('error==thumbnail ===', {err}));
  // }, []);

  /**
   * It is used to render the share button for UI.
   */
  const renderShareButton = () => {
    return (
      <View style={styles.shareContainer}>
        <Button
          isLoading={formInfo.isLoading}
          isDisabled={formInfo.isLoading}
          title={'Share'}
          onPress={() => {
            setFormInfo({
              ...formInfo,
              isLoading: true,
            });
            // setTimeout(() => {
            //   navigation.navigate('Stream');
            // }, 2000);
            UploadVideoAction(
              {
                userAvatar: userAvtar,
                data: formInfo,
              },
              response => {
                setFormInfo({
                  ...formInfo,
                  isLoading: false,
                });
                if (response.status === 200) {
                  showToastSucess(response.data.message);
                  navigation.navigate('Stream');
                  AsyncStorage.setItem(response.hash, response.videoUrl);
                  // AsyncStorage.setItem(response.hash + 'thumbnail', thumbnail);
                  EventRegister.emit('VideoUploaded', response);
                } else if (
                  response.response.status == 401 &&
                  response.response.data &&
                  response.response.data.message
                ) {
                  RemoveAllStoredDataFromAsyncStorage();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'splash'}, {name: 'login'}],
                    }),
                  );
                  showToastAlert(response.response.data.message);
                } else if (
                  response.response.data &&
                  response.response.data.message
                ) {
                  showToastAlert(response.response.data.message);
                } else if (response && response.message) {
                  showToastAlert(response.message);
                }
                // navigation.navigate('Stream');
                // console.log('data====response====', data);
              },
            );
          }}
          marginTop={10}
        />
      </View>
    );
  };

  /**
   * It is used to render social buttons UIs.
   */
  const renderSocialButtonsUIs = () => {
    return (
      <View style={styles.buttonMainContainer}>
        <TouchableOpacity
          style={styles.buttons}
          // onPress={() => }
        >
          <Image
            source={require('../../assets/images/fb.png')}
            style={{width: 11, height: 21}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          // onPress={() => }
        >
          <Image
            source={require('../../assets/images/youtube.png')}
            style={{width: 26, height: 20}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          // onPress={() => }
        >
          <Image
            source={require('../../assets/images/instagram.png')}
            style={{width: 19, height: 19}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttons}
          // onPress={() => }
        >
          <Image
            source={require('../../assets/images/linkedin.png')}
            style={{width: 18, height: 17}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  /**
   * It is used to render sparks tags UIs.
   */
  const renderSparksTags = () => {
    return (
      <View style={styles.tagsContainer}>
        <Text style={styles.sparkTagText}>Spark Tags</Text>
        <View style={styles.mainTagsContainer}>
          <Text style={styles.tagText}>motivations</Text>
          <Text style={styles.tagText}>inspirational</Text>
          <Text style={styles.tagText}>amazing</Text>
        </View>
      </View>
    );
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

  return (
    <View
      style={styles.container}
      pointerEvents={formInfo.isLoading ? 'none' : 'auto'}>
      {false ? (
        renderIndicatorUIs()
      ) : (
        <>
          <Image
            source={
              thumbnail
                ? {uri: thumbnail}
                : require('../../assets/images/bgImage.png')
            }
            style={styles.bgImage}
          />
          <TopHeader
            searchImage
            searchVisible
            rightViewImage={require('../../assets/images/crossWithRound.png')}
            searc
            backgroundColor={'rgba(0, 0, 0, 0.2)'}
            text={''}
            onPressBackArrow={() => navigation.pop()}
            onPressSearchClose={() => navigation.pop()}
            isHoldPhysicalBack={formInfo.isLoading}
          />

          <View style={styles.formContainer}>
            <KeyboardAwareScrollView extraHeight={300}>
              <Input
                defaultValue={formInfo.value.title}
                inputRef={refTitle}
                isBorderVisible={true}
                isDisable={false}
                placeholder={formInfo.placeholder.title}
                marginTop={20}
                autoCompleteType={InputAutoCompleteType.name}
                autoCorrect={false}
                // keyboardType={InputKeyboardType.emailAddress}
                returnKeyType={InputReturnKeyType.next}
                onSubmitEditing={() => {
                  refCaption.current && refCaption.current.focus();
                }}
                onChangeText={text => {
                  setFormInfo({
                    ...formInfo,
                    value: {...formInfo.value, title: text},
                  });
                }}
              />
              <Input
                containerStyle={{height: 92, paddingTop: 10}}
                multiline
                defaultValue={formInfo.value.caption}
                inputRef={refCaption}
                isBorderVisible={true}
                isDisable={false}
                placeholder={formInfo.placeholder.caption}
                marginTop={20}
                autoCompleteType={InputAutoCompleteType.name}
                autoCorrect={false}
                // keyboardType={InputKeyboardType.emailAddress}
                returnKeyType={InputReturnKeyType.next}
                onChangeText={text => {
                  setFormInfo({
                    ...formInfo,
                    value: {...formInfo.value, caption: text},
                  });
                }}
                onSubmitEditing={() => {
                  refPlace.current && refPlace.current.focus();
                }}
              />
              <Input
                defaultValue={formInfo.value.place}
                inputRef={refPlace}
                isBorderVisible={true}
                isDisable={false}
                placeholder={formInfo.placeholder.place}
                marginTop={20}
                autoCompleteType={InputAutoCompleteType.name}
                autoCorrect={false}
                // keyboardType={InputKeyboardType.emailAddress}
                returnKeyType={InputReturnKeyType.next}
                onChangeText={text => {
                  setFormInfo({
                    ...formInfo,
                    value: {...formInfo.value, place: text},
                  });
                }}
                onSubmitEditing={() => {
                  refAddSparkTag.current && refAddSparkTag.current.focus();
                }}
              />
              <Input
                defaultValue={formInfo.value.addSparkTag}
                inputRef={refAddSparkTag}
                isBorderVisible={true}
                isDisable={false}
                placeholder={formInfo.placeholder.addSparkTag}
                marginTop={20}
                autoCompleteType={InputAutoCompleteType.name}
                autoCorrect={false}
                // keyboardType={InputKeyboardType.emailAddress}
                returnKeyType={InputReturnKeyType.done}
                onChangeText={text => {}}
                onSubmitEditing={() => {}}
              />
              {renderSparksTags()}
              <Text style={styles.shareToText}>Share To</Text>
              {renderSocialButtonsUIs()}
              {renderShareButton()}
            </KeyboardAwareScrollView>
          </View>
        </>
      )}
    </View>
  );
};

export default FinalizeVideoFromScreen;
