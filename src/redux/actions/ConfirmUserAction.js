import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';
import {Platform} from 'react-native';

export const ConfirmUserAction = (payload, confirmUserResponse) => {
  // console.warn("payload", payload)

  let body = JSON.stringify({
    // "email": payload.email,
    confirmationCode: payload.confirmationCode,
    username: payload.username,
    password: payload.password,
  });
  console.warn('body', body);
  fetch(BASE_URL + API.CONFIRMUSER, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: body,
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      confirmUserResponse(responseData);
    })
    .catch(error => {
      confirmUserResponse(error);
    })
    .done();
};
