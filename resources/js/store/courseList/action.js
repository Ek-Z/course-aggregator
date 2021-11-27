import { createAction } from '@reduxjs/toolkit';
import { URLS } from '../../utils/urls/urls';
import { fetchData, setFilterPath, checkFilterState, setDefaultFilterState } from '../../utils/HOF/HOF';
import { pagesLoaded } from '../pages/action';

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
export const FILTER_SET_PATH = 'FILTER::SET_PATH';
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
export const filterSetPath = createAction(FILTER_SET_PATH);
export const filterClear = createAction(FILTER_CLEAR);

export const getLastCourses = () => async dispatch => {
    dispatch(courseListOnload());

    try {
        const lastCourses = await fetchData(URLS.NEW_COURSES);

        dispatch(courseListLoaded(lastCourses.data));
    } catch (err) {
        dispatch(courseListFailed(err));
    }
};

export const getPublicCourseList = (currentPage, filterPath) => async dispatch => {
    dispatch(courseListOnload());

    try {
        const courseList = await fetchData(
            `${filterPath ?
                URLS.PUBLIC_COURSELIST + `?${filterPath}` + `&page=${currentPage}` :
                URLS.PUBLIC_COURSELIST + `?page=${currentPage}`}`
        );

        dispatch(courseListLoaded(courseList.data));
    } catch (error) {
        dispatch(courseListFailed(error));
    }
};

export const getAdminCourseList = (currentPage, filterPath) => async dispatch => {
    dispatch(courseListOnload());

    try {
        const courseList = await fetchData(
            `${filterPath ?
                URLS.ADMIN_COURSELIST + `?${filterPath}` + `&page=${currentPage}` :
                URLS.ADMIN_COURSELIST + `?page=${currentPage}`}`
        );

        dispatch(courseListLoaded(courseList.data));
    } catch (error) {
        dispatch(courseListFailed(error));
    }
};

export const getFilters = () => async dispatch => {
    dispatch(filterInit());

    try {
        const filters = await fetchData(URLS.PROGRAMMING_LANGUAGES);
        const statefulFilters = setDefaultFilterState(filters.data);

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

    const filterPath = setFilterPath(selectedFilters);

    dispatch(filterSetPath(filterPath));

    const filteredCourseList = await fetchData(`${URLS.PUBLIC_COURSELIST + `?${filterPath}`}`);

    dispatch(pagesLoaded(filteredCourseList.meta));
    dispatch(courseListFiltered(filteredCourseList.data));
};

export const setFilterClear = filters => dispatch => {
    const clearedFilters = setDefaultFilterState(filters);

    dispatch(filterClear(clearedFilters));
};
