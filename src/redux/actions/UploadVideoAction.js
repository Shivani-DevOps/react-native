import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import Axios from 'axios';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstant from '../../utils/constants';
Axios.defaults.timeout = 100000;

export const UploadVideoAction = async (payload, uploadResponse) => {
  function makeid() {
    var text = '';
    var possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 15; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  console.log('Axios', Axios);
  let userData = await AsyncStorage.getItem('userDetail');
  var formData = new FormData();
  const hashKey = makeid();
  formData.append('shasum', hashKey);
  formData.append('locationName', 'Atlanta, Georgia');
  formData.append('userId', JSON.parse(userData)._id);
  formData.append(
    'title',
    payload.data.value.title ? payload.data.value.title : '',
  );
  formData.append(
    'caption',
    payload.data.value.caption ? payload.data.value.caption : '',
  );
  formData.append('lat', '33.7490');
  formData.append('lng', '84.3880');

  if (payload.userAvatar) {
    formData.append('file', {
      uri:
        Platform.OS === 'android'
          ? payload.userAvatar.uri
          : payload.userAvatar.uri.replace('file://', ''),
      type: 'video/mp4',
      name: 'file',
    });
  }
  formData.append('_method', 'POST');
  let requestURL = `https://spark.sparkseekerapi.com/api/Spark`;
  let loginToken = await AsyncStorage.getItem('loginToken');

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      accept: 'application/json',
      Authorization: loginToken,
      userId: AppConstant.shared.globalStoredUserInfo._id, //JSON.parse(userData)._id,
    },
  };

  Axios.post(requestURL, formData, config)
    .then(result => {
      uploadResponse({
        ...result,
        hash: hashKey,
        videoUrl: payload.userAvatar.uri,
      });
    })
    .catch(error => {
      uploadResponse({...error, hash: hashKey});
    });
};

export const GetAllVideosAction = async (pagination, allVideosResponse) => {
  let loginToken = await AsyncStorage.getItem('loginToken');
  // let userData = await AsyncStorage.getItem('userDetail');
  var requestParameters = {};
  if (pagination) {
    requestParameters = pagination.getRequestParameters(requestParameters);
  }
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: loginToken,
      userId: AppConstant.shared.globalStoredUserInfo._id, //JSON.parse(userData)._id,
    },
    params: requestParameters,
  };
  Axios.get('https://spark.sparkseekerapi.com/api/Spark/All', config)
    .then(result => {
      allVideosResponse(result);
    })
    .catch(error => {
      allVideosResponse(error);
    });
};
