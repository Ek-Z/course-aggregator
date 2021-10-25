import { COURSE_CARD_FAILED, COURSE_CARD_LOADED, COURSE_CARD_ONLOAD } from './action';

const initialState = {
    courseInfo: {},
    status: 'IDLE',
    error: '',
};

export const courseCardReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COURSE_CARD_ONLOAD:
            return {
                ...state,
                status: 'REQUEST',
            };
        case COURSE_CARD_LOADED:
            return {
                ...state,
                courseInfo: payload,
                status: 'SUCCESS',
            };
        case COURSE_CARD_FAILED:
            return {
                ...state,
                status: 'FAILED',
                error: payload,
            };
        default:
            return state;
    }
};
