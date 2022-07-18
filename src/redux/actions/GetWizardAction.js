import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';

export const GetWizardAction = (payload, wizardResponse) => {
  axios
    .get(BASE_URL + API.GETWIZARD, {
      headers: {
        'Content-Type': 'application/json',
        //  authorization: payload.accessToken
      },
    })
    .then(response => {
      console.warn('WizardSucess-->', response.data);
      wizardResponse(response);
      // dispatch(EmailSuccess(response.data));
    })
    .catch(error => {
      console.warn('WizardError-->', error);
      // dispatch(EmailFail(error));
      wizardResponse(error);
    })
    .done();
};

export const SaveWizardAction = (payload, saveWizardResponse) => {
  fetch(BASE_URL + API.SaveWIZARD, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload.wizard),
  })
    .then(response => {
      return response.json();
    })
    .then(responseData => {
      saveWizardResponse(responseData);
    })
    .catch(error => {
      saveWizardResponse(error);
    })
    .done();
};
