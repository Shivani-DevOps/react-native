import { API, BASE_URL } from '../constants';
import * as types from '../events/index';

export const GetProfileAction = (payload) => {
    return function (dispatch) {
        fetch(BASE_URL + API.GETPROFILE + `${payload.userName}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + payload.access_token
            },
        })
            .then((response) => response.json())
            .then((responseData) => {
                dispatch(PrfileSuccess(responseData));
            })
            .catch((error) => {
                dispatch(PrfileFail(error))
            });

    };
};
export const PrfileSuccess = (responseData) => {
    return {
        type: types.GETPROFILE_SUCCESS,
        response: responseData,
    };
};
export const PrfileFail = (error) => {
    return {
        type: types.GETPROFILE_FAIL,
        error: error.message,
    };
};