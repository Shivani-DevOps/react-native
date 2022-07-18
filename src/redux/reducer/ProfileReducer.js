import * as types from '../events'

const initialState = {
    profileResponse: undefined,

};
const ProfileReducer = (state = initialState, action) => {

    switch (action.type) {
         
        case types.GETPROFILE_SUCCESS:
             console.log("rprpr",action.response)
            return {...state, profileResponse: action.response};
        case types.GETPROFILE_FAIL:
            return {...state, profileResponse: action.error};
        default:
            return state
    }
};

export default ProfileReducer
