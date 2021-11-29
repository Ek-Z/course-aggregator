import {
    addInFavoritesError,
    addInFavoritesStart,
    addInFavoritesSuccess,
    delFromFavoritesError,
    delFromFavoritesStart,
    delFromFavoritesSuccess,
    getFavoritesError,
    getFavoritesStart,
    getFavoritesSuccess,
} from "./actions";
import {fetchData} from "../../utils/HOF/HOF";
import {ADD_IN_FAVORITES_URL, DEL_FROM_FAVORITES_URL, GET_FAVORITES_URL} from "../../utils/urls/urls";

export const addInFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(addInFavoritesStart());
        fetch(`${ADD_IN_FAVORITES_URL}/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Application-Authorization': `Bearer ${userToken}`,
                'x-csrf-token': document.querySelector("[name='csrf-token']").getAttribute('content'),
            },
        }).then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText)
            }
            return res;
        })
            .then(async () => {
            const favorites = await fetchData('api/my_favorites')
            await alert('Курс успешно добавлен в Избранное');
            await dispatch(addInFavoritesSuccess(favorites.data))
            })
            .catch((e) => {
                dispatch(addInFavoritesError(e));
                alert('Просим прощения, ошибка добавления курса в избранное на сервере')
                console.log(e)
            })
};

export const delFromFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(delFromFavoritesStart());
        fetch(`${DEL_FROM_FAVORITES_URL}/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Application-Authorization': `Bearer ${userToken}`,
                'x-csrf-token': document.querySelector("[name='csrf-token']").getAttribute('content'),
            },
        }).then(res => {
            if (res.status !== 200) {
                throw new Error(res.statusText)
            }
            return res;
        })
            .then(async() => {
            const favorites = await fetchData('api/my_favorites')
            await alert('Курс успешно удалён из Избранного');
            await dispatch(delFromFavoritesSuccess(favorites.data))
        })
            .catch((e) => {
                dispatch(delFromFavoritesError(e));
                alert('Просим прощения, ошибка удаления курса из избранного на сервере')
                console.log(e)
            })
};

export const getFavoritesThunk = () => async dispatch => {
    dispatch(getFavoritesStart());
    try {
        const favorites =  await fetchData(GET_FAVORITES_URL)
        if (favorites.data){
             dispatch(getFavoritesSuccess(favorites.data))
        } else {
             dispatch(getFavoritesSuccess([]))
        }
    }
    catch (e) {
        dispatch(getFavoritesError(e));
        alert('Просим прощения, ошибка на сервере')
        console.log('ошибка', e)
    }
}