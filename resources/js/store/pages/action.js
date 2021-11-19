import {createAction} from "@reduxjs/toolkit";
import {fetchMeta} from "../../utils/HOF/HOF";
import {PUBLIC_COURSES_LIST_URL} from "../../utils/urls/urls";

export const PAGES_LOADED = 'PAGES::LOADED';
export const CHANGE_PAGE = 'PAGES::CHANGE_PAGE';

export const pagesLoaded = createAction(PAGES_LOADED);
export const changePage = createAction(CHANGE_PAGE)

export const getPagesOfCourseList = () => async dispatch => {
    const pages = await fetchMeta(PUBLIC_COURSES_LIST_URL);
    dispatch(pagesLoaded(pages));
}
