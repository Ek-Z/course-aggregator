import {
    ADD_IN_FAVORITES_ERROR,
    ADD_IN_FAVORITES_START,
    ADD_IN_FAVORITES_SUCCESS,
    DEL_FROM_FAVORITES_ERROR,
    DEL_FROM_FAVORITES_START,
    DEL_FROM_FAVORITES_SUCCESS,
    GET_FAVORITES_ERROR,
    GET_FAVORITES_START,
    GET_FAVORITES_SUCCESS

} from "./types";

const initialState = {
    favorites:[],
    favoritesPending:false,
    favoritesError:null
};

export const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_IN_FAVORITES_START:
            return {
                ...state,
                favoritesPending: true,
                favoritesError: null,
            };
        case ADD_IN_FAVORITES_SUCCESS:
            return {
                favorites:action.payload,
                favoritesPending: false,
                favoritesError: null
            };
        case ADD_IN_FAVORITES_ERROR:
            return {
                ...state,
                favoritesPending: false,
                favoritesError: action.payload
            };
        case DEL_FROM_FAVORITES_START:
            return {
                ...state,
                favoritesPending: true,
                favoritesError: null,
            };
        case DEL_FROM_FAVORITES_SUCCESS:
            return {
                favorites:action.payload,
                favoritesPending: false,
                favoritesError: null
            };
        case DEL_FROM_FAVORITES_ERROR:
            return {
                ...state,
                favoritesPending: false,
                favoritesError: action.payload
            };
        case GET_FAVORITES_START:
            return {
                ...state,
                favoritesPending: true,
                favoritesError: null,
            };
        case GET_FAVORITES_SUCCESS:
            return {
                favorites:action.payload,
                favoritesPending: false,
                favoritesError: null
            };
        case GET_FAVORITES_ERROR:
            return {
                ...state,
                favoritesPending: false,
                favoritesError: action.payload
            };
        default:
            return state;
    }
};
