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
            dispatch(filterList([]))
            setSearch(filterWords)
        })
    },[search])

    useEffect(() => {
        if (!filterWords){
            setSearch("");
            dispatch(filterList([]))
        }
    },[filterWords])


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
            sx={{
                // width:700,
                display:'block',
                margin: '0 10px 25px 10px',
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
                fullWidth={true}
                onKeyPress={handlePressInput}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ height: '100%', margin:'0' }}>
                            <Button type="button" onClick={clickSearch} color="secondary" variant="contained" sx={{ marginRight: '0' }} >
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
