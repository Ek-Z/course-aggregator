import { COURSE_LIST_FAILED, COURSE_LIST_FILTERED, COURSE_LIST_LOADED, COURSE_LIST_ONLOAD } from './action';
import { value } from 'lodash/seq';

const initialState = {
    courseList: [],
    status: 'IDLE',
    error: {
        state: false,
        message: '',
    },
    isFiltered: false,
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
        case COURSE_LIST_FILTERED:
            const pattern = new RegExp(payload.value, 'gi');
            const filteredCourseList = payload.courseList.filter(course => pattern.test(course.title));

            return {
                ...state,
                status: 'FILTERED',
                courseList: [...filteredCourseList],
                isFiltered: true,
            };
        default:
            return state;
    }
};
