import {LOG_IN, LOG_OUT} from "./types";

export const logIn = (data) => ({ type: LOG_IN, payload:data });
export const logOut = () => ({ type: LOG_OUT });
