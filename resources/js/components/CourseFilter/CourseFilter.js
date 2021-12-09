import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { getFilters, getSelectedFilters } from '../../store/courseList/action';
import { selectFilters, selectFiltersStatus } from '../../store/courseList/selectors';
import { Filters } from '../Filters/Filters';
import { STATUSES } from '../../utils/statuses/statuses';
import style from './CourseFilter.module.scss';

export const CourseFilter = () => {
    const filters = useSelector(selectFilters);
    const filterStatus = useSelector(selectFiltersStatus);
    const dispatch = useDispatch();

    const handleFilterSubmit = evt => {
        evt.preventDefault();

        dispatch(getSelectedFilters(filters));
    };

    React.useEffect(() => {
        filterStatus !== STATUSES.SUCCESS && dispatch(getFilters());
    }, [dispatch]);

    return (
        <form action="#" className={style.filter} onSubmit={handleFilterSubmit}>
            {filterStatus === STATUSES.SUCCESS && Object.entries(filters).map((filter, index) => filter ?
                <Filters key={index} filterTitles={filter[0]} filterValues={filter[1]} /> :
                <div>Ошибка</div>
            )}
            <Button
                onClick={handleFilterSubmit}
                color="primary"
                variant="contained"
                sx={{
                    color: '#fff',
                    width: '100%',
                    fontWeight: 500,
                    fontSize: '15px',
                    marginTop: '16px'
                }}
            >
                Применить
            </Button>
        </form>
    );
};
