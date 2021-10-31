import {LOG_IN, LOG_OUT} from "./types";

const initialState = {
    userName:"",
    session: false, //изначально false для неавторизованных пользователей
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                username:action.payload,
                session: true
            };
        case LOG_OUT:
            return {
                ...state,
                username: "",
                session: false
            };
        default:
            return state;
    }
};
