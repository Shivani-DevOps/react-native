import * as types from '../events'

const initialState = {
    loginResponse: undefined,

};
const LoginReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.EMAIL_SUCCESS:

            return {...state, loginResponse: action.response,};
        case types.EMAIL_FAIL:
            return {...state, loginResponse: action.error};
        default:
            return state
    }
};

export default LoginReducer
