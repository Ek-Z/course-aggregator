import { COURSE_LIST_FAILED, COURSE_LIST_LOADED, COURSE_LIST_ONLOAD } from './action';

const initialState = {
    courseList: [],
    status: 'IDLE',
    error: {
        state: false,
        message: '',
    }
};

export const courseListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COURSE_LIST_ONLOAD:
            return {
                ...state,
                status: 'REQUEST',
            };
        case COURSE_LIST_LOADED:
            return {
                ...state,
                courseList: [...payload],
                status: 'SUCCESS',
                error: {
                    ...state.error,
                    state: false,
                }
            };
        case COURSE_LIST_FAILED:
            return {
                ...state,
                status: 'FAILED',
                error: {
                    ...state.error,
                    state: true,
                    message: payload,
                }
            };
        default:
            return state;
    }
};
