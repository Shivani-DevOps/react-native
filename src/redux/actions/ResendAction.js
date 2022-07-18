import * as types from '../events/index';
import {API, BASE_URL, DeviceType} from '../constants';
import axios from 'axios';
import {Platform} from "react-native";


export const ResendAction = (payload, resendOtpResponse) => {
    // console.warn("payload", payload)

    let body = JSON.stringify({
        //"email": payload.email,
        //"phone_number": payload.phone_number,
        "username":payload.username



    });
    console.warn("Aaaaa--->>>", body)
    fetch(BASE_URL + API.RESENDOTP, {
            method:'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body:body
        },
    ) .then((response) => {
        return response.json();
    })
        .then((responseData) => {
            resendOtpResponse(responseData)
        })
        .catch((error) => {
            resendOtpResponse(error)
        }).done();
};
