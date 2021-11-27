import { createAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/HOF/HOF';
import { getPublicCourseList } from '../courseList/action';

export const PAGES_LOADED = 'PAGES::LOADED';
export const CHANGE_PAGE = 'PAGES::CHANGE_PAGE';

export const pagesLoaded = createAction(PAGES_LOADED);
export const changePage = createAction(CHANGE_PAGE);

export const getPagesOfCourseList = url => async dispatch => {
    const pages = await fetchData(url);
    dispatch(pagesLoaded(pages.meta));
};

export const getCurrentPage = (pageNumber, filterPath) => dispatch => {
    dispatch(changePage(pageNumber));
    dispatch(getPublicCourseList(pageNumber, filterPath));
}
