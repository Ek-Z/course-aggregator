import {
    CLEAR_ERROR,
    LOG_IN_ERROR,
    LOG_IN_START,
    LOG_IN_SUCCESS,
    LOG_OUT_ERROR,
    LOG_OUT_START,
    LOG_OUT_SUCCESS
} from "./types";

const initialState = {
    userName:"",
    is_admin:false,
    session: false, //изначально false для неавторизованных пользователей
    sessionPending:false,
    sessionError:null
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOG_IN_START:
            return {
                ...state,
                sessionPending: true,
                sessionError: null,
            };
        case LOG_IN_SUCCESS:
            return {
                ...state,
                userName:action.payload.name,
                is_admin: action.payload.is_admin,
                session: true,
                sessionPending: false,
                sessionError: null
            };
        case LOG_IN_ERROR:
            return {
                ...state,
                sessionPending: false,
                sessionError: action.payload
            };
        case CLEAR_ERROR:
            return {
                ...state,
                sessionError: null
            };
        case LOG_OUT_START:
            return {
                ...state,
                sessionPending: true,
                sessionError: null,
            };
        case LOG_OUT_SUCCESS:
            return {
                userName: "",
                is_admin: false,
                session: false,
                sessionPending: false,
                sessionError: null,
            };
        case LOG_OUT_ERROR:
            return {
                ...state,
                sessionPending: false,
                sessionError: action.payload
            };
        default:
            return state;
    }
};
