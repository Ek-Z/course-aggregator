import * as React from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import style from './InputSearch.module.scss';

export default function InputSearch () {

    return (
        <Box
            sx={{
                width: '100%',
                display: 'block',
                margin: '0 auto 25px',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                name="search"
                value={''}
                onChange={()=>{}}
                className={style.inputSearch}
                id="outlined-basic"
                variant="outlined"
                fullWidth={true}
                onKeyPress={() => {}}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ height: '100%', margin: '0' }}>
                            <Button type="button" color="secondary" variant="contained"
                                    sx={{ marginRight: '0' }}>
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
