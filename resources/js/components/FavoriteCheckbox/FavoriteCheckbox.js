import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Tooltip } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { addInFavoritesThunk, delFromFavoritesThunk } from '../../store/favorites/thunks';
import { selectFavorites } from '../../store/favorites';
import { selectUserName } from '../../store/session/selectors';

export const FavoriteCheckbox = ({ id }) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);
    const userName = useSelector(selectUserName);
    const favorites = useSelector(selectFavorites);

    const [fill, setFill] = useState(false);

    let ids = favorites.map(item => item.id);//id курсов, иконку сердечка которых надо закрасить

    useEffect(() => {
        if (ids.includes(id)) {
            setFill(true);
        } else {
            setFill(false);
        }
    }, [favorites]);

    useEffect(() => {
        if (fill) {
            setChecked(true);
        }
        if (!ids.includes(id)) {
            setChecked(false);
        }
        if (!userName) {
            setChecked(false);
        }
        if (!favorites) {
            setChecked(false);
        }
    }, [fill, userName]);

    const handleClick = () => {
        if (checked === false) {
            setChecked(!checked);
            dispatch(addInFavoritesThunk({ id }));//добавить в избранное
        } else {
            setChecked(!checked);
            dispatch(delFromFavoritesThunk({ id }));//удалить из избранного
        }
    };

    return (
        <Tooltip title={checked ? 'Удалить из избранного' : 'Добавить в избранное'}>
            <Checkbox {...label}
                      icon={<FavoriteBorder style={{ fill: '#f84646' }}/>}
                      checkedIcon={<Favorite/>}
                      color="secondary"
                      style={{ padding: 0 }}
                      checked={checked}
                      onClick={handleClick}
            />
        </Tooltip>
    );
};
