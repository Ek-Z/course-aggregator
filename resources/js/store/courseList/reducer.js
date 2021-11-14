import { createReducer } from '@reduxjs/toolkit';
import {courseListFailed, courseListLoaded, courseListOnload, filterList, searchWords} from './action';
import { STATUS_FAILED, STATUS_IDLE, STATUS_REQUEST, STATUS_SUCCESS } from '../../utils/statuses/statuses';

const initialState = {
    courseList: [],
    filteredList: [],
    status: STATUS_IDLE,
    error: null,
    isFiltered: false,
    filters: {
        'Языки программирования': ['PHP', 'JavaScript'],
        'Языки курсов': ['Русский', 'Английский'],
    },
    filterWords:"",
};

export const courseListReducer = createReducer(initialState, builder => {
    builder
        .addCase(courseListOnload, state => {
            state.status = STATUS_REQUEST;
        })
        .addCase(courseListLoaded, (state, { payload }) => {
            state.courseList = payload;
            state.status = STATUS_SUCCESS;
            state.error = null;
        })
        .addCase(courseListFailed, (state, { payload }) => {
            state.status = STATUS_FAILED;
            state.error = payload;
        })
        .addCase(searchWords, (state, { payload }) => {
            state.filterWords = payload
        })
        .addCase(filterList, (state, { payload }) => {
            state.filteredList = payload
        })
        .addDefaultCase(() => {});
});
