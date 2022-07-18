import React, {Component} from 'react';
import {Image, View, Text, ImageBackground} from 'react-native';
import {Spacer} from '../../components/spacer';
import BaseClass from '../../utils/BaseClass';
import styles from './CreateStyle';
import {CreateButtons} from '../../components/createbuttons';
import {SafeAreaViewContainer} from '../../utils/BaseStyle';
import {
  OpenCamera,
  OpenImagePickerLibrary,
} from '../../components/image-picker-helper';

const CreateScreen = ({route, navigation}) => {
  /**
   * Open image picker library.
   */
  async function openImagePicker() {
    try {
      let imageObject = await OpenImagePickerLibrary();
      console.log('imageObject===', imageObject);
      navigation.navigate('FinalizeVideoFromScreen', {
        userAvtar: imageObject.documentPath,
      });
      // setUserAvatar(imageObject.documentPath)
      // setOBJUserAvatar(imageObject)
    } catch (error) {
      // (Object.entries(error).length !== 0 && error.code !== "E_PICKER_CANCELLED") && AppConstant.shared.showAlertFor(null, error)
    }
  }

  return (
    <SafeAreaViewContainer style={styles.container}>
      <View style={{flex: 0.6}}>
        <Image
          source={require('../../assets/images/logo2.png')}
          style={styles.image}
        />
        <Spacer space={1} />
        <Text style={styles.createText}>Create</Text>
      </View>
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <CreateButtons
          image={require('../../assets/images/liveCreate.png')}
          title={'GO LIVE'}
          onClick={() => console.log('hh')}
        />
        <Spacer space={2} />
        <CreateButtons
          image={require('../../assets/images/library.png')}
          title={'LIBRARY'}
          onClick={() => openImagePicker()}
        />
        <Spacer space={2} />
        <CreateButtons
          image={require('../../assets/images/record.png')}
          title={'RECORD'}
          onClick={() => console.log('yy')}
        />
      </View>
    </SafeAreaViewContainer>
  );
};

export default CreateScreen;
