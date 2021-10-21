import { ALL_COURSES_URL, getCourses } from '../../../urls/urls';

const LOCAL_COURSE_API = 'https://raw.githubusercontent.com/Ek-Z/course-aggregator/main/resources/data/data.json';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::COURSE_LIST_ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::COURSE_LIST_LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::COURSE_LIST_FAILED';
export const COURSE_LIST_FILTERED = 'COURSE_LIST::COURSE_LIST_FILTERED';

export const courseListOnload = () => ({
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
});

export const getCourseList = () => async (dispatch) => {
    dispatch(courseListOnload());

    try {
        const response = await fetch(ALL_COURSES_URL);

        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }

        const result = await response.json();

        dispatch(courseListLoaded(result));
    } catch (e) {
        dispatch(courseListFailed(e));
    }
};

export const courseListFilter = (value, courseList) => (dispatch) => {
    value = value.trim();

    if (value) {
        const pattern = new RegExp(value, 'gi');
        const filteredList = courseList.filter((course) => pattern.test(course.title));
        dispatch(courseListFiltered(filteredList));
    } else {
        dispatch(courseListLoaded(courseList));
    }
};
