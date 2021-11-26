import {LOGIN_URL, REGISTER_URL} from "../../utils/urls/urls";
import {logInError, logInStart, logInSuccess} from "./actions";
import axios from "axios";

export const logInThunk = (user) => async dispatch => {
    dispatch(logInStart());
    try {
        let response = await axios.post(LOGIN_URL, user);
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
        let response = await axios.post(REGISTER_URL, user);
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
