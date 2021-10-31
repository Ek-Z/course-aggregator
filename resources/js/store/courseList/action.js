import { createAction } from '@reduxjs/toolkit';
import { PUBLIC_COURSES_LIST_URL, ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import { getData } from '../../utils/HOF/HOF';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::COURSE_LIST_ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::COURSE_LIST_LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::COURSE_LIST_FAILED';
export const COURSE_LIST_FILTERED = 'COURSE_LIST::COURSE_LIST_FILTERED';

export const courseListOnload = createAction(COURSE_LIST_ONLOAD);
export const courseListLoaded = createAction(COURSE_LIST_LOADED);
export const courseListFailed = createAction(COURSE_LIST_FAILED);

/*export const courseListOnload = () => ({
    type: COURSE_LIST_ONLOAD,
});

export const courseListLoaded = (courseList) => ({
    type: COURSE_LIST_LOADED,
    payload: courseList,
});

export const courseListFailed = (err) => ({
    type: COURSE_LIST_FAILED,
    payload: err,
});

export const courseListFiltered = (courseList) => ({
    type: COURSE_LIST_FILTERED,
    payload: courseList,
});*/

export const getPublicCourseList = () => async dispatch => {
    dispatch(courseListOnload());

    try {
        const courseList = await getData(PUBLIC_COURSES_LIST_URL);

        dispatch(courseListLoaded(courseList));
    } catch (error) {
        dispatch(courseListFailed(error));
    }
};

export const getAdminCourseList = () => async dispatch => {
    dispatch(courseListOnload());

    try {
        const courseList = await getData(ADMIN_COURSE_LIST_URL);

        dispatch(courseListLoaded(courseList));
    } catch (error) {
        dispatch(courseListFailed(error));
    }
};

/*export const getCourseList = () => async (dispatch) => {
    dispatch(courseListOnload());

    try {
        const response = await fetch(ADMIN_COURSE_LIST_URL);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response
            .json()
            .then(json => json.data);

        dispatch(courseListLoaded(result));
    } catch (e) {
        dispatch(courseListFailed(e));
    }
};*/

/*export const courseListFilter = (value, courseList) => (dispatch) => {
    value = value.trim();

    if (value) {
        const pattern = new RegExp(value, 'gi');
        const filteredList = courseList.filter((course) => pattern.test(course.title));
        dispatch(courseListFiltered(filteredList));
    } else {
        dispatch(courseListLoaded(courseList));
    }
};*/

