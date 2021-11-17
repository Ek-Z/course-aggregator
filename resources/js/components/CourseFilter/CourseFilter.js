import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getFilters, getSelectedFilters } from '../../store/courseList/action';
import { selectFilters, selectFiltersStatus } from '../../store/courseList/selectors';
import { Filters } from '../Filters/Filters';
import style from './CourseFilter.module.scss';
import { STATUS_SUCCESS } from '../../utils/statuses/statuses';

export const CourseFilter = () => {
    const filters = useSelector(selectFilters);
    const filterStatus = useSelector(selectFiltersStatus);
    const dispatch = useDispatch();

    const handleSubmit = evt => {
        evt.preventDefault();

        dispatch(getSelectedFilters(filters));
    };

    React.useEffect(() => {
        filterStatus !== STATUS_SUCCESS && dispatch(getFilters());
    }, [dispatch]);

    return (
        <form action="#" className={style.filter} onSubmit={handleSubmit}>
            {filterStatus === 'SUCCESS' && Object.entries(filters).map((filter, index) => filter ?
                <Filters key={index} filterTitles={filter[0]} filterValues={filter[1]}/> :
                null
            )}
            <Button
                onClick={handleSubmit}
                color="secondary"
                variant="contained"
                sx={{
                    color: '#fff',
                    width: '100%',
                    fontWeight: 500,
                    fontSize: '15px',
                    marginTop: '16px'
                }}
            >
                Поиск
            </Button>
        </form>
    );
};
