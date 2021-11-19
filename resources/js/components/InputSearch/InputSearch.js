import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField, InputAdornment } from '@mui/material';
import { selectFilters } from '../../store/courseList/selectors';
import { getSelectedFilters, setInputValue } from '../../store/courseList/action';
import style from './InputSearch.module.scss';

export const InputSearch = () => {
    const [value, setValue] = React.useState('');
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    const handleChange = evt => setValue(evt.target.value);

    const handleSubmit = evt => {
        evt.preventDefault();
        value && dispatch(setInputValue(value.trim()));
        dispatch(getSelectedFilters(filters, value.trim()));
    };

    React.useEffect(() => {
        setValue('');

        return () => {
            setValue('');
        };
    }, []);

    return (
        <form onSubmit={handleSubmit} className={style.form}>
            <TextField
                autoFocus={true}
                value={value}
                onChange={handleChange}
                className={style.inputSearch}
                variant="outlined"
                fullWidth={true}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end" sx={{ height: '100%', margin: '0' }}>
                            <Button type="submit"
                                    color="secondary"
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{
                                        marginRight: '0',
                                        color: '#ffffff'
                                    }}
                            >
                                Найти курсы
                            </Button>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
};
