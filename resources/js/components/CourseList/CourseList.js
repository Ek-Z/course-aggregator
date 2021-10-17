import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSortedCourseList } from '../../../store/courseList/selectors';
import { Course } from '../Course/Course';
import { getCourseList } from '../../../store/courseList/action';
import style from './CourseList.module.scss'

export const CourseList = () => {
    const courseList = useSelector(selectSortedCourseList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <section className={style.section}>
            <div className={`${style.section__wrap} container`}>
                <h2 className={style.section__title}>Каталог курсов</h2>
                <div className={style.section__list}>
                    {courseList.map(course => <Course item={course} key={course.id}/>)}
                </div>
            </div>
        </section>
    );
};
