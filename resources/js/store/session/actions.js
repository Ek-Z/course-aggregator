import {CLEAR_ERROR, LOG_IN_ERROR, LOG_IN_START, LOG_IN_SUCCESS, LOG_OUT} from "./types";

export const logInStart = () => ({ type: LOG_IN_START });
export const logInSuccess = (data) => ({ type: LOG_IN_SUCCESS, payload:data });
export const logInError = (error) => ({ type: LOG_IN_ERROR, payload:error });

export const clearError = () => ({ type: CLEAR_ERROR });

export const logOut = () => ({ type: LOG_OUT });


