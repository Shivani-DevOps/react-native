// ----------------------------------------
// ----------------------------------------
// Base Url
// ----------------------------------------
import {Platform} from "react-native";

module.exports.BASE_URL = "https://devuser.sparkseekerapi.com";

// ----------------------------------------

// Device Type
// ----------------------------------------
export const DeviceType = Platform.OS === "ios" ? "ios" : "android";
// ----------------------------------------
// ----------------------------------------
// End Points
// ----------------------------------------
export const API = {

    LOGIN: "/login",
    SIGNUP: "/register",
    CONFIRMUSER: "/confirm",
    RESENDOTP: "/resend",
    GETWIZARD: "/wizards",
    GETPROFILE: "/profiles/",
    LOGOUT: "/logout",
    ONBOARDING: "/boardings",
    SaveWIZARD: "/interests",


    //SEEK TAB APIS
    CHECK_POLLS_EXISTS: "/checkPolls",
    GET_POLLS: "/polls",
    VOTE_ON_POLL: "/choices",
    SEARCH_SEEK: "/search",

    //RESET PASSWORD APIS
    FORGOTPASSWORD: "/forgot",


};
