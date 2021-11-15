import { createAction } from '@reduxjs/toolkit';
import { PUBLIC_COURSES_LIST_URL, ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import { fetchData } from '../../utils/HOF/HOF';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::COURSE_LIST_ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::COURSE_LIST_LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::COURSE_LIST_FAILED';
export const COURSE_LIST_FILTERED = 'COURSE_LIST::COURSE_LIST_FILTERED';
export const SEARCH_WORDS = 'FILTER_WORDS::SEARCH_WORDS';
export const FILTER_LIST = 'FILTERED_LIST::FILTER_LIST';

export const FILTER_INIT = 'FILTER::FILTER_INIT';
export const FILTER_LOADED = 'FILTER::FILTER_LOADED';
export const FILTER_FAILED = 'FILTER::FILTER_FAILED';

export const courseListOnload = createAction(COURSE_LIST_ONLOAD);
export const courseListLoaded = createAction(COURSE_LIST_LOADED);
export const courseListFailed = createAction(COURSE_LIST_FAILED);
export const searchWords = createAction(SEARCH_WORDS);
export const filterList = createAction(FILTER_LIST);
export const filterInit = createAction(FILTER_INIT);
export const filterLoaded = createAction(FILTER_LOADED);
export const filterFailed = createAction(FILTER_FAILED);

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

        dispatch(filterLoaded(filters));
    } catch (err) {
        dispatch(filterFailed(err));
    }
};
