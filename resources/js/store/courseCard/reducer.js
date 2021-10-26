import { STATUS_FAILED, STATUS_IDLE, STATUS_REQUEST, STATUS_SUCCESS } from '../statuses/statuses';
import { COURSE_CARD_FAILED, COURSE_CARD_LOADED, COURSE_CARD_ONLOAD } from './action';

const initialState = {
    course: {},
    status: STATUS_IDLE,
    error: '',
};

export const courseCardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COURSE_CARD_ONLOAD:
            return {
                ...state,
                status: STATUS_REQUEST,
            };
        case COURSE_CARD_LOADED:
            return {
                ...state,
                course: payload,
                status: STATUS_SUCCESS,
            };
        case COURSE_CARD_FAILED:
            return {
                ...state,
                course: {},
                status: STATUS_FAILED,
                error: payload,
            };
        default:
            return state;
    }
};
