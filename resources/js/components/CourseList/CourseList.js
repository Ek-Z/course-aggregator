import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList, selectIsFiltered } from '../../../store/courseList/selectors';
import { Course } from '../Course/Course';
import { courseListFilter, getCourseList } from '../../../store/courseList/action';
import { CourseFilter } from '../CourseFilter/CourseFilter';
import style from './CourseList.module.scss';

export const CourseList = () => {
    const courseList = useSelector(selectCourseList);
    const isFiltered = useSelector(selectIsFiltered);
    const dispatch = useDispatch();

    const handleFilter = useCallback((value) => {
        dispatch(courseListFilter(value, courseList));
    });

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <section className={style.section}>
            <div className={`${style.section__wrap} container`}>
                <h2 className={style.section__title}>Каталог курсов</h2>
                <CourseFilter onSubmit={handleFilter}/>
                <div className={style.section__list}>
                    {courseList.map(course => <Course item={course} key={course.id}/>)}
                </div>
            </div>
        </section>
    );
};
