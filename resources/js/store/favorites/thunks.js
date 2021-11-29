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

export const addInFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(addInFavoritesStart());
    try {
        fetch(`api/favorite/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Application-Authorization': `Bearer ${userToken}`,
                'x-csrf-token': document.querySelector("[name='csrf-token']").getAttribute('content'),
            },
        }).then(async () => {
            const favorites = await fetchData('api/my_favorites')
            await alert('Курс успешно добавлен в Избранное');
            await dispatch(addInFavoritesSuccess(favorites.data))
        })
            .catch((e) => {
                console.log(e)
            })
    }
    catch (e) {
        dispatch(addInFavoritesError(e));
        console.log('ошибка', e)
    }
};

export const delFromFavoritesThunk = ({id}) => dispatch => {
    const userToken = JSON.parse(localStorage.getItem('userData')).data.token;
    dispatch(delFromFavoritesStart());
    try {
        fetch(`api/unfavorite/${id}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
                'Application-Authorization': `Bearer ${userToken}`,
                'x-csrf-token': document.querySelector("[name='csrf-token']").getAttribute('content'),
            },
        }).then(async() => {
            const favorites = await fetchData('api/my_favorites')
            await alert('Курс успешно удалён из Избранного');
            await dispatch(delFromFavoritesSuccess(favorites.data))
        })
            .catch((e) => {
                dispatch(delFromFavoritesError(e));
                console.log(e)
            })
    }
    catch (e) {
        dispatch(delFromFavoritesError(e));
        console.log('ошибка', e)
    }
};

export const getFavoritesThunk = () => async dispatch => {
    dispatch(getFavoritesStart());
    try {
        const favorites = await fetchData('api/my_favorites')
        if (favorites.data){
            dispatch(getFavoritesSuccess(favorites.data))
        } else {
            dispatch(getFavoritesSuccess([]))
        }
    }
    catch (e) {
        dispatch(getFavoritesError(e));
        console.log('ошибка', e)
    }
}
