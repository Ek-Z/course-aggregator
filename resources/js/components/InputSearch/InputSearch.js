import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import style from "./InputSearch.module.scss"
import {useState} from "react";
import {useDispatch} from "react-redux";
import {filterList, searchWords} from "../../store/courseList/action";

export default function InputSearch() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("")
    const onInputChange = (event) => {
        setSearch(event.target.value);
        console.log(search)
    }

    const clickSearch = () => {
        dispatch(searchWords(search))
        if (search !== ""){
            fetch(`/api/courses/search/${search}`, {
                headers:{
                    'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Credentials': 'true',
                    'Access-Control-Allow-Headers' : 'Origin, Content-Type, Accept'
                },
            })
                .then(response => response.json())
                .then(result => {
                    console.log("result:", result);
                    dispatch(filterList(result));
                })
                .catch((error) => console.log(error))
            console.log(search)
        }
    }

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
                value={search}
                onChange={onInputChange}
                className={style.inputSearch}
                id="outlined-basic"
                variant="outlined"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button onClick={clickSearch} color="secondary" variant="contained" sx={{ marginRight: '1.5rem' }} >
                                <Link to="/courses">
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
