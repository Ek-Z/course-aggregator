import {
    ADD_IN_FAVORITES_ERROR,
    ADD_IN_FAVORITES_START,
    ADD_IN_FAVORITES_SUCCESS,
    DEL_FROM_FAVORITES_ERROR,
    DEL_FROM_FAVORITES_START,
    DEL_FROM_FAVORITES_SUCCESS,
    GET_FAVORITES_ERROR,
    GET_FAVORITES_START,
    GET_FAVORITES_SUCCESS,
} from "./types";

export const addInFavoritesStart = () => ({ type: ADD_IN_FAVORITES_START });
export const addInFavoritesSuccess = (data) => ({ type: ADD_IN_FAVORITES_SUCCESS, payload: data});
export const addInFavoritesError = (error) => ({ type: ADD_IN_FAVORITES_ERROR, payload:error });

export const delFromFavoritesStart = () => ({ type: DEL_FROM_FAVORITES_START });
export const delFromFavoritesSuccess = (data) => ({ type: DEL_FROM_FAVORITES_SUCCESS, payload:data});
export const delFromFavoritesError = (error) => ({ type: DEL_FROM_FAVORITES_ERROR, payload:error });

export const getFavoritesStart = () => ({ type: GET_FAVORITES_START });
export const getFavoritesSuccess = (data) => ({ type:GET_FAVORITES_SUCCESS, payload:data});
export const getFavoritesError = (error) => ({ type: GET_FAVORITES_ERROR, payload:error });
