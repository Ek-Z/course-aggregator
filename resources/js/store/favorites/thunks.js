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
import {URLS} from "../../utils/urls/urls";

export const addInFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(addInFavoritesStart());
        fetch(`${URLS.ADD_IN_FAVORITES}/${id}`, {
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
            const favorites = await fetchData(URLS.GET_FAVORITES);
            if (favorites instanceof Error) throw favorites;
            await alert('Курс успешно добавлен в Избранное');
            await dispatch(addInFavoritesSuccess(favorites.data))
            })
            .catch((e) => {
                dispatch(addInFavoritesError(e));
                alert('Добавить курс не получилось: ошибка на сервере')
                console.log(e)
            })
};

export const delFromFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(delFromFavoritesStart());
        fetch(`${URLS.DEL_FROM_FAVORITES}/${id}`, {
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
            const favorites = await fetchData(URLS.GET_FAVORITES);
            if (favorites instanceof Error) throw favorites;
            await alert('Курс успешно удалён из Избранного');
            await dispatch(delFromFavoritesSuccess(favorites.data))
        })
            .catch((e) => {
                dispatch(delFromFavoritesError(e));
                alert('Удалить курс не получилось: ошибка на сервере')
                console.log(e)
            })
};

export const getFavoritesThunk = () => async dispatch => {
    dispatch(getFavoritesStart());
    try {
        const favorites =  await fetchData(URLS.GET_FAVORITES)
        if (favorites instanceof Error) throw favorites;
        if (favorites.data){
             dispatch(getFavoritesSuccess(favorites.data))
        } else {
             dispatch(getFavoritesSuccess([]))
        }
    }
    catch (e) {
        dispatch(getFavoritesError(e));
        alert('Содержимое Избранного загрузить не получилось: ошибка на сервере')
        console.log('ошибка', e)
    }
}
