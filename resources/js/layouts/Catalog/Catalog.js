import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCourseList,
    selectCourseListLength,
    selectFilteredList, selectFilteredListLength,
    selectIsFiltered, selectProgrammingLanguages
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import { getPublicCourseList, setFilterClear } from '../../store/courseList/action';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import style from './Catalog.module.scss';

export const Catalog = () => {
    const filteredList = useSelector(selectFilteredList);
    const filteredListLength = useSelector(selectFilteredListLength);
    const programmingLanguages = useSelector(selectProgrammingLanguages);
    const isFiltered = useSelector(selectIsFiltered);
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const dispatch = useDispatch();

    useEffect(() => {
        (!courseListLength || !filteredListLength) && dispatch(getPublicCourseList());
    }, [dispatch, courseListLength, filteredListLength]);

    useEffect(() => {
        return () => {
            !!programmingLanguages && dispatch(setFilterClear(programmingLanguages));
        };
    }, []);

    return (
        <section className={style.catalog}>
            <div className={`container ${style.wrap}`}>
                <h2 className={style.title}>Список бесплатных курсов</h2>
                <InputSearch/>
                <div className={style.list}>
                    <CourseFilter/>
                    {isFiltered ? <CourseList list={filteredList}/> : <CourseList list={courseList}/>}
                </div>
            </div>
        </section>
    );
};
