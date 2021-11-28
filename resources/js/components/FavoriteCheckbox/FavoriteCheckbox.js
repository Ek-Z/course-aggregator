import React from "react";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";

export const FavoriteCheckbox = () => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    return(
        <Checkbox {...label}
                  icon={<FavoriteBorder style={{fill:'#f84646'}}/>}
                  checkedIcon={<Favorite />}
                  color="secondary"
                  style={{padding:0}}
        />
    )
}
