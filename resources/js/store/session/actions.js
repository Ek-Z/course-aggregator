import {CLEAR_ERROR, LOG_IN_ERROR, LOG_IN_START, LOG_IN_SUCCESS, LOG_OUT_START, LOG_OUT_SUCCESS, LOG_OUT_ERROR} from "./types";

export const logInStart = () => ({ type: LOG_IN_START });
export const logInSuccess = (data) => ({ type: LOG_IN_SUCCESS, payload:data });
export const logInError = (error) => ({ type: LOG_IN_ERROR, payload:error });

export const clearError = () => ({ type: CLEAR_ERROR });

export const logOutStart = () => ({ type: LOG_OUT_START });
export const logOutSuccess = () => ({ type: LOG_OUT_SUCCESS });
export const logOutError = () => ({ type: LOG_OUT_ERROR });


