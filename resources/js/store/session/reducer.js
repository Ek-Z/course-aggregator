import {LOG_IN, LOG_OUT} from "./types";

const initialState = {
    userName:"",
    is_admin:false,
    session: false, //изначально false для неавторизованных пользователей
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN:
            return {
                ...state,
                userName:action.payload.name,
                is_admin: action.payload.is_admin,
                session: true
            };
        case LOG_OUT:
            return {
                ...state,
                userName: "",
                is_admin: false,
                session: false
            };
        default:
            return state;
    }
};
