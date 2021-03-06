import {URLS} from "../../utils/urls/urls";
import {logInError, logInStart, logInSuccess, logOutError, logOutStart, logOutSuccess} from "./actions";
import axios from "axios";
import {getFavoritesSuccess} from "../favorites";

export const logInThunk = (user) => async dispatch => {
    dispatch(logInStart());
    try {
        let response = await axios.post(URLS.LOGIN, user);
        if (response.status === 200) {
            localStorage.setItem("userData", JSON.stringify(response.data));
            dispatch(logInSuccess(response.data.data))
        }
    }
    catch (e) {
        dispatch(logInError(e));
        console.log('ошибка', e)
    }
};

export const registerThunk = (user) => async dispatch => {
    dispatch(logInStart());
    try {
        let response = await axios.post(URLS.REGISTER, user);
        if (response.status === 200) {
            localStorage.setItem("userData", JSON.stringify(response.data));
            dispatch(logInSuccess(response.data.data))
        }
    }
    catch (e) {
        dispatch(logInError(e));
        console.log('ошибка', e)
    }
};

export const logOutThunk = () => async dispatch => {
    dispatch (logOutStart());
    try {
        let userToken = JSON.parse(localStorage.getItem('userData')).data.token;//токен пользователя
        let response = await axios.post(URLS.LOGOUT, {}, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        if (response.status === 200){
            localStorage.removeItem('userData');
            await dispatch(getFavoritesSuccess([]))
            await dispatch(logOutSuccess());
        }
    }
    catch (e) {
        dispatch(logOutError(e));
        console.log('ошибка', e);
        alert('Произошла ошибка на сервере')
    }
};
