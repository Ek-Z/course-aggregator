import { createReducer } from '@reduxjs/toolkit';
import {
  courseListFailed, courseListFiltered,
  courseListLoaded,
  courseListOnload, filterClear,
  filterFailed, filterInit,
  filterLoaded, filterStateChanged, setInputValue,
} from './action';
import { STATUSES } from '../../utils/statuses/statuses';

const initialState = {
  courseList: [],
  filteredList: [],
  status: STATUSES.IDLE,
  error: null,
  isFiltered: false,
  filters: {
    data: {
      'Языки программирования': null,
      'Языки курсов': [{ id: 1, title: 'Русский', state: false }, { id: 2, title: 'English', state: false }],
    },
    inputValue: '',
    status: STATUSES.IDLE,
    error: null,
  }
};

export const courseListReducer = createReducer(initialState, builder => {
  builder
    .addCase(courseListOnload, state => {
      state.status = STATUSES.REQUEST;
    })
    .addCase(courseListLoaded, (state, { payload }) => {
      state.courseList = payload;
      state.status = STATUSES.SUCCESS;
      state.error = null;
      state.isFiltered = false;
    })
    .addCase(courseListFailed, (state, { payload }) => {
      state.status = STATUSES.FAILED;
      state.error = payload;
    })
    .addCase(courseListFiltered, (state, { payload }) => {
      state.filteredList = payload;
      state.isFiltered = true;
    })
    .addCase(filterInit, state => {
      state.filters.status = STATUSES.REQUEST;
    })
    .addCase(filterLoaded, (state, { payload }) => {
      state.filters.data['Языки программирования'] = payload;
      state.filters.status = STATUSES.SUCCESS;
    })
    .addCase(filterFailed, (state, { payload }) => {
      state.filters.status = STATUSES.FAILED;
      state.filters.error = payload;
    })
    .addCase(setInputValue, (state, { payload }) => {
      state.filters.inputValue = payload;
    })
    .addCase(filterStateChanged, (state, { payload }) => {
      state.filters.data[payload.title][payload.index].state = !state.filters.data[payload.title][payload.index].state;
    })
    .addCase(filterClear, (state, { payload }) => {
      state.filters.data['Языки программирования'] = payload;
      state.isFiltered = false;
    })
    .addDefaultCase(() => {});
});
