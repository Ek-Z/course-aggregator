import { createAction } from '@reduxjs/toolkit';
import { PUBLIC_COURSES_LIST_URL, ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import { fetchData } from '../../utils/HOF/HOF';

export const COURSE_LIST_ONLOAD = 'COURSE_LIST::ONLOAD';
export const COURSE_LIST_LOADED = 'COURSE_LIST::LOADED';
export const COURSE_LIST_FAILED = 'COURSE_LIST::FAILED';
export const COURSE_LIST_FILTERED = 'COURSE_LIST::FILTERED';
export const SEARCH_WORDS = 'FILTER_WORDS::SEARCH_WORDS';
export const FILTER_LIST = 'FILTERED_LIST::FILTER_LIST';

export const FILTER_INIT = 'FILTER::INIT';
export const FILTER_LOADED = 'FILTER::LOADED';
export const FILTER_FAILED = 'FILTER::FAILED';
export const FILTER_STATE_CHANGED = 'FILTER::STATE_CHANGED';
export const FILTER_SUBMIT = 'FILTER::SUBMIT';

export const courseListOnload = createAction(COURSE_LIST_ONLOAD);
export const courseListLoaded = createAction(COURSE_LIST_LOADED);
export const courseListFailed = createAction(COURSE_LIST_FAILED);
export const searchWords = createAction(SEARCH_WORDS);
export const filterList = createAction(FILTER_LIST);
export const filterInit = createAction(FILTER_INIT);
export const filterLoaded = createAction(FILTER_LOADED);
export const filterFailed = createAction(FILTER_FAILED);
export const filterStateChanged = createAction(
    FILTER_STATE_CHANGED,
    (index, title) => ({ payload: { index, title } })
);
export const filterSubmit = createAction(FILTER_SUBMIT);

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

        let statefulFilters = [];
        for (let filter of filters) {
            filter = { ...filter, state: false };
            statefulFilters = [...statefulFilters, filter];
        }

        dispatch(filterLoaded(statefulFilters));
    } catch (err) {
        dispatch(filterFailed(err));
    }
};

export const changeFilterState = (filterIndex, filterTitle) => dispatch => {
    dispatch(filterStateChanged(filterIndex, filterTitle));
};

export const getSelectedFilters = filters => async dispatch => {
    dispatch(filterSubmit());

    let selectedFilters = {};

    for (const filtersKey in filters) {
        const selectedFilter = filters[filtersKey].filter(filter => filter.state === true);
        selectedFilters = { ...selectedFilters, [filtersKey]: selectedFilter };
        if (!selectedFilters[filtersKey].length) delete selectedFilters[filtersKey];
    }

    let filterPath = [];

    for (const selectedFiltersKey in selectedFilters) {
        let languages = [];
        let programmingLanguages = [];

        if (selectedFiltersKey === 'Языки курсов') {
            for (const language of selectedFilters[selectedFiltersKey]) {
                languages = [...languages, language.title];
            }
            filterPath = [...filterPath, `filter[language]=${languages.join('')}`];
        }

        if (selectedFiltersKey === 'Языки программирования') {
            for (const programmingLanguage of selectedFilters[selectedFiltersKey]) {
                programmingLanguages = [...programmingLanguages, programmingLanguage.id];
            }
            filterPath = [...filterPath, `filter[programmingLanguage_id]=${programmingLanguages.join('')}`];
        }
    }

    const filteredCourseList = await fetchData(`${PUBLIC_COURSES_LIST_URL}?${filterPath.join('')}`);


};
