import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import style from "./InputSearch.module.scss"

export default function InputSearch() {
    return (
        <Box
            component="form"
            sx={{
                width:700,
                display:'block',
                margin: '0 auto 25px',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                name="search"
                className={style.inputSearch}
                id="outlined-basic"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button color="secondary" variant="contained" sx={{ marginRight: '1.5rem' }} >
                                <Link to="#">
                                    найти курсы
                                </Link>
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />


        </Box>
    );
}
