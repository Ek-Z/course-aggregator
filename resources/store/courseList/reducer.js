import { COURSE_LIST_FAILED, COURSE_LIST_FILTERED, COURSE_LIST_LOADED, COURSE_LIST_ONLOAD } from './action';

const initialState = {
    courseList: [],
    filteredList: [],
    status: 'IDLE',
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
                status: 'REQUEST',
            };
        case COURSE_LIST_LOADED:
            return {
                ...state,
                courseList: [...payload],
                filteredList: [],
                status: 'SUCCESS',
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
                status: 'FAILED',
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
