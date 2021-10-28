import { COURSE_LIST_FAILED, COURSE_LIST_FILTERED, COURSE_LIST_LOADED, COURSE_LIST_ONLOAD } from './action';
import { STATUS_FAILED, STATUS_IDLE, STATUS_REQUEST, STATUS_SUCCESS } from '../../utils/statuses/statuses';

const initialState = {
    courseList: [],
    filteredList: [],
    status: STATUS_IDLE,
    error: {
        state: false,
        message: '',
    },
    isFiltered: false,
    filters: {},
};

export const courseListReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case COURSE_LIST_ONLOAD:
            return {
                ...state,
                status: STATUS_REQUEST,
            };
        case COURSE_LIST_LOADED:
            return {
                ...state,
                courseList: payload,
                filteredList: [],
                status: STATUS_SUCCESS,
                error: {
                    ...state.error,
                    state: false,
                },
                isFiltered: false,
                filters: {
                    'Языки программирования': ['PHP', 'JavaScript'],
                    'Языки курсов': ['Русский', 'Английский'],
                },
            };
        case COURSE_LIST_FAILED:
            return {
                ...state,
                status: STATUS_FAILED,
                error: {
                    ...state.error,
                    state: true,
                    message: payload,
                },
            };
        case COURSE_LIST_FILTERED:
            return {
                ...state,
                status: 'FILTERED',
                filteredList: [...payload],
                isFiltered: true,
            };
        default:
            return state;
    }
};
