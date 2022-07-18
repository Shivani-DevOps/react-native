import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import Axios from 'axios';
import {Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstant from '../../utils/constants';

export const ThankVideo = async (sparkID, responseBlock) => {
  let loginToken = await AsyncStorage.getItem('loginToken');
  // let userData = await AsyncStorage.getItem('userDetail');
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: loginToken,
      userId: AppConstant.shared.globalStoredUserInfo._id, //JSON.parse(userData)._id,
    },
  };
  Axios.post(
    `https://spark.sparkseekerapi.com/api/Spark/Thanks/${sparkID}`,
    null,
    config,
  )
    .then(result => {
      responseBlock(result);
    })
    .catch(error => {
      responseBlock(error);
    });
};

export const BookmarkVideo = async (sparkID, responseBlock) => {
  let loginToken = await AsyncStorage.getItem('loginToken');
  // let userData = await AsyncStorage.getItem('userDetail');
  const config = {
    headers: {
      accept: 'application/json',
      Authorization: loginToken,
      userId: AppConstant.shared.globalStoredUserInfo._id, //JSON.parse(userData)._id,
    },
  };
  Axios.post(
    `https://spark.sparkseekerapi.com/api/Spark/Bookmark/${sparkID}`,
    null,
    config,
  )
    .then(result => {
      responseBlock(result);
    })
    .catch(error => {
      responseBlock(error);
    });
};
