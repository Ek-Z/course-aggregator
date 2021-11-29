import React, {useEffect, useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {addInFavoritesThunk, delFromFavoritesThunk} from "../../store/favorites/thunks";
import {useDispatch, useSelector} from "react-redux";
import {selectFavorites} from "../../store/favorites";
import {selectCourseList} from "../../store/courseList/selectors";

export const FavoriteCheckbox = ({id, fill}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        console.log(fill)
        if (fill){
            setChecked(true)
        }
    },[])

    const handleClick = () => {
        if (checked === false){
            setChecked(!checked);
            console.log(`должно быть добавлено ${id}`)
            dispatch(addInFavoritesThunk({id}))//добавить в избранное
        } else {
            setChecked(!checked);
            console.log(`должно быть удалено ${id}`)
            dispatch(delFromFavoritesThunk({id}))//удалить из избранного
        }

    }

    return(
        <Checkbox {...label}
                  icon={<FavoriteBorder style={{fill:'#f84646'}}/>}
                  checkedIcon={<Favorite />}
                  color="secondary"
                  style={{padding:0}}
                  checked={checked}
                  onClick={handleClick}
        />
    )
}
