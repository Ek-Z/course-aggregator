import { createAction } from '@reduxjs/toolkit';
import { PUBLIC_COURSES_LIST_URL, ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import { fetchData, setFilterPath, checkFilterState, setDefaultFilterState } from '../../utils/HOF/HOF';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::FAILED';
export const COURSE_LIST_FILTERED = 'COURSE_LIST::FILTERED';
export const FILTER_INIT = 'FILTER::INIT';
export const FILTER_LOADED = 'FILTER::LOADED';
export const FILTER_FAILED = 'FILTER::FAILED';
export const FILTER_STATE_CHANGED = 'FILTER::STATE_CHANGED';
export const FILTER_SET_VALUE = 'FILTER::SET_VALUE';
export const FILTER_SUBMIT = 'FILTER::SUBMIT';
export const FILTER_CLEAR = 'FILTER::CLEAR';

export const courseListOnload = createAction(COURSE_LIST_ONLOAD);
export const courseListLoaded = createAction(COURSE_LIST_LOADED);
export const courseListFailed = createAction(COURSE_LIST_FAILED);
export const courseListFiltered = createAction(COURSE_LIST_FILTERED);
export const filterInit = createAction(FILTER_INIT);
export const filterLoaded = createAction(FILTER_LOADED);
export const filterFailed = createAction(FILTER_FAILED);
export const filterStateChanged = createAction(
  FILTER_STATE_CHANGED,
  (index, title) => ({ payload: { index, title } })
);
export const setInputValue = createAction(FILTER_SET_VALUE);
export const filterSubmit = createAction(FILTER_SUBMIT);
export const filterClear = createAction(FILTER_CLEAR);

export const getPublicCourseList = () => async dispatch => {
  dispatch(courseListOnload());

  try {
    const courseList = await fetchData(PUBLIC_COURSES_LIST_URL);

    dispatch(courseListLoaded(courseList));
  } catch (error) {
    dispatch(courseListFailed(error));
  }
};

export const getAdminCourseList = () => async dispatch => {
  dispatch(courseListOnload());

  try {
    const courseList = await fetchData(ADMIN_COURSE_LIST_URL);

    dispatch(courseListLoaded(courseList));
  } catch (error) {
    dispatch(courseListFailed(error));
  }
};

export const getFilters = () => async dispatch => {
  dispatch(filterInit());

  try {
    const filters = await fetchData('/api/programmingLanguages');
    const statefulFilters = setDefaultFilterState(filters);

    dispatch(filterLoaded(statefulFilters));
  } catch (err) {
    dispatch(filterFailed(err));
  }
};

export const changeFilterState = (filterIndex, filterTitle) => dispatch => {
  dispatch(filterStateChanged(filterIndex, filterTitle));
};

export const getSelectedFilters = (filters, inputValue) => async dispatch => {
  dispatch(filterSubmit());

  let selectedFilters = checkFilterState(filters);

  if (inputValue) selectedFilters = { ...selectedFilters, 'Заголовок': inputValue };

  const filteredCourseList = await setFilterPath(selectedFilters);

  dispatch(courseListFiltered(filteredCourseList));
};

export const setFilterClear = filters => dispatch => {
  const clearedFilters = setDefaultFilterState(filters);

  dispatch(filterClear(clearedFilters));
};
