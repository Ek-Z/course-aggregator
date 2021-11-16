import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCourseList,
    selectCourseListLength,
    selectFilteredList, selectFilteredListLength, selectFilters,
    selectFilterWords, selectIsFiltered
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import { getPublicCourseList } from '../../store/courseList/action';
import InputSearch from '../../components/InputSearch/InputSearch';

export const Catalog = () => {
    const filterWords = useSelector(selectFilterWords);
    const filteredList = useSelector(selectFilteredList);
    const filteredListLength = useSelector(selectFilteredListLength);
    const isFiltered = useSelector(selectIsFiltered);
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const dispatch = useDispatch();

    useEffect(() => {
        (!courseListLength || !filteredListLength) && dispatch(getPublicCourseList());
    }, [dispatch, courseListLength, filteredListLength]);

    return (
        <div className="container" style={{ display: 'flex', flexDirection: 'column', marginTop: 20}}>
            <h2 style={{ textAlign: 'center', marginBottom: 50 }}>
                Список бесплатных курсов
            </h2>
            <InputSearch/>
            <div style={{ display: 'flex' }}>
                <CourseFilter/>
                {isFiltered ? <CourseList list={filteredList}/> : <CourseList list={courseList}/>}
            </div>
        </div>
    );
};
