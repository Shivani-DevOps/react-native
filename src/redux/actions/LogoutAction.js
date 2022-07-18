import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';

export const LogoutAction = (payload, logoutResponse) => {
    console.warn("payload", payload)
    axios.post(BASE_URL + API.LOGOUT, JSON.stringify({accessToken: payload.accessToken}),{
            headers: {
                "Content-Type": "application/json",
                //  authorization: payload.accessToken
            },
        },
    ).then((response) => {
        console.warn('logoutSucess-->', response.data);
        logoutResponse(response.data)
        // dispatch(EmailSuccess(response.data));
    })
        .catch((error) => {
            console.warn('logoutError-->', error);
            // dispatch(EmailFail(error));
            logoutResponse(error)
        }).done();
};




