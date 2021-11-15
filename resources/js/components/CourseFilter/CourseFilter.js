import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFilters } from '../../store/courseList/action';
import { selectFilters } from '../../store/courseList/selectors';

export const CourseFilter = () => {
    const filters = useSelector(selectFilters);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getFilters());
        console.log(filters);
    }, [dispatch]);

    return (
        <div>
            <form action="#">
                <button type="submit">Поиск</button>
            </form>
        </div>
    );
};
