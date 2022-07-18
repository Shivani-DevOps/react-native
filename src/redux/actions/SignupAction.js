import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';

export const SignupAction = (payload, signupResponse) => {
  // console.warn("payload", payload)
  let body = JSON.stringify({
    accounttype: payload.actype,
    email: payload.userEmail,
    phone_number: payload.phone_number,
    dateofBirth: payload.dateofBirth,
    username: payload.userName,
    password: payload.userPassword,
    profileName: payload.seekerName,
    preferredSubtitles: payload.lang,
    profession: payload.profession,
  });

  console.log('body', body);

  //    fetch(BASE_URL + API.SIGNUP, {
  fetch('https://devuser.sparkseekerapi.com/register', {
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
      signupResponse(responseData);
    })
    .catch(error => {
      signupResponse(error);
    })
    .done();
  // .then((response) => {
  //     console.warn('SucessResss-->', response);
  //     signupResponse(response.data)
  // })
  // .catch((error) => {
  //     debugger
  //     console.warn('Error-->121', error.message);
  //     signupResponse(error)
  // }).done();
};
