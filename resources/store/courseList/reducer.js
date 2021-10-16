import { COURSE_LIST_FAILED, COURSE_LIST_LOADED, COURSE_LIST_ONLOAD } from './action';

const initialState = {
    courseList: [],
    status: 'COURSE_LIST.IDLE',
    error: {
        state: null,
        message: '',
    }
};

export const courseListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COURSE_LIST_ONLOAD:
            return {
                ...state,
                status: 'COURSE_LIST.REQUEST',
            };
        case COURSE_LIST_LOADED:
            return {
                ...state,
                courseList: [...payload],
                status: 'COURSE_LIST.SUCCESS',
                error: {
                    ...state.error,
                    state: false,
                }
            };
        case COURSE_LIST_FAILED:
            return {
                ...state,
                status: 'COURSE_LIST.FAILED',
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
