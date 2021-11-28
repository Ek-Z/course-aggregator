import React, {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import {addInFavoritesThunk, delFromFavoritesThunk} from "../../store/favorites/thunks";
import {useDispatch} from "react-redux";

export const FavoriteCheckbox = ({id}) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

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
