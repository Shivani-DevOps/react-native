import {API, BASE_URL} from '../constants';

export const LoginAction = (payload, loginResponse) => {

    fetch(BASE_URL + API.LOGIN, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload.data
    })
        .then((response) => response.json())
        .then(result => loginResponse(result))
        .catch(error => {
            loginResponse(error);
        });
};
