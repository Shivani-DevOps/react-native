import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';

export const OnBoardingVideoAction = (payload, onBoardingVideoResponse) => {
  console.warn('payload', payload);
  axios
    .get(BASE_URL + API.ONBOARDING, {
      // headers: {
      //   "Content-Type": "application/json",
      //   //  authorization: payload.accessToken
      // },
    })
    .then(response => {
      console.warn('VideoSucess-->', response.data);
      onBoardingVideoResponse(response.data);
      // dispatch(EmailSuccess(response.data));
    })
    .catch(error => {
      console.warn('VideoError-->', error);
      // dispatch(EmailFail(error));
      onBoardingVideoResponse(error);
    })
    .done();
};
