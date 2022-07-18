import * as types from '../events'

const initialState = {
    signupResponse: undefined,

};
const SignupReducer = (state = initialState, action) => {

    switch (action.type) {

        case types.SIGNUP_SUCCESS:

            return {...state, signupResponse: action.response,};
        case types.SIGNUP_FAIL:
            return {...state, signupResponse: action.error};
        default:
            return state
    }
};

export default SignupReducer;
