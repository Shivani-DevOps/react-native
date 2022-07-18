import {combineReducers} from 'redux';
import LoginReducer from './LoginReducer';
import SignupReducer from './SignupReducer';
import ProfileReducer from './ProfileReducer';



const rootReducer = (state, action) => {
    if (action.type === 'LOGOUT_SUCCESS') {
        state = undefined;
    }
    return appReducer(state, action);
};

const appReducer = combineReducers({
    LoginReducer,
    SignupReducer,
    ProfileReducer
});
export default rootReducer;
