import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import style from "./InputSearch.module.scss"
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {filterList, searchWords} from "../../store/courseList/action";
import {selectFilterWords} from "../../store/courseList/selectors";
import {useHistory} from "react-router";
import { useRouteMatch } from 'react-router-dom';

export default function InputSearch() {
    const match = useRouteMatch();
    let history = useHistory();

    const dispatch = useDispatch();
    const filterWords = useSelector(selectFilterWords);
    const [search, setSearch] = useState(filterWords)

    const onInputChange = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        window.addEventListener("beforeunload", () => {
            dispatch(searchWords(""));
            setSearch(filterWords)
        })
    },[search])


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
                    dispatch(filterList(result));
                })
                .catch((error) => console.log(error))
        }
    }
    const handlePressInput = ({ code }) => {
        if (code === "Enter") {
            clickSearch();
            if (match.path == "/"){
                history.push("/courses");
            }
        }
    };

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
                onKeyPress={handlePressInput}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Button type="button" onClick={clickSearch} color="secondary" variant="contained" sx={{ marginRight: '1.5rem' }} >
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
