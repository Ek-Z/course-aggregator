import { createAction } from '@reduxjs/toolkit';
import { fetchData } from '../../utils/HOF/HOF';

export const PAGES_LOADED = 'PAGES::LOADED';
export const CHANGE_PAGE = 'PAGES::CHANGE_PAGE';

export const pagesLoaded = createAction(PAGES_LOADED);
export const changePage = createAction(CHANGE_PAGE);

export const getPagesOfCourseList = url => async dispatch => {
    const pages = await fetchData(url);
    dispatch(pagesLoaded(pages.meta));
};
