import { createReducer } from '@reduxjs/toolkit';
import {
    courseListFailed, courseListFiltered,
    courseListLoaded,
    courseListOnload,
    filterFailed, filterInit,
    filterList,
    filterLoaded, filterStateChanged,
    searchWords
} from './action';
import { STATUS_FAILED, STATUS_IDLE, STATUS_REQUEST, STATUS_SUCCESS } from '../../utils/statuses/statuses';

const initialState = {
    courseList: [],
    filteredList: [],
    status: STATUS_IDLE,
    error: null,
    isFiltered: false,
    filters: {
        data: {
            'Языки программирования': null,
            'Языки курсов': [{ id: 1, title: 'Русский', state: false }, { id: 2, title: 'English', state: false }],
        },
        status: STATUS_IDLE,
        error: null,
    },
    filterWords: '',
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
            state.isFiltered = false;
        })
        .addCase(courseListFailed, (state, { payload }) => {
            state.status = STATUS_FAILED;
            state.error = payload;
        })
        .addCase(courseListFiltered, (state, { payload }) => {
            state.filteredList = payload;
            state.isFiltered = true;
        })
        .addCase(filterInit, state => {
            state.filters.status = STATUS_REQUEST;
        })
        .addCase(filterLoaded, (state, { payload }) => {
            state.filters.data['Языки программирования'] = payload;
            state.filters.status = STATUS_SUCCESS;
        })
        .addCase(filterFailed, (state, { payload }) => {
            state.filters.status = STATUS_FAILED;
            state.filters.error = payload;
        })
        .addCase(filterStateChanged, (state, { payload }) => {
            state.filters.data[payload.title][payload.index].state = !state.filters.data[payload.title][payload.index].state;
        })
        .addCase(searchWords, (state, { payload }) => {
            state.filterWords = payload;
        })
        .addCase(filterList, (state, { payload }) => {
            state.filteredList = payload;
        })
        .addDefaultCase(() => {});
});
