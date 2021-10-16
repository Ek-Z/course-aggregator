import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList, selectCourseListLength } from '../../../store/courseList/selectors';
import { Course } from '../Course/Course';
import { getCourseList } from '../../../store/courseList/action';
import style from './CourseList.module.scss'

export const CourseList = () => {
    let courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const dispatch = useDispatch();

    const filteredCourseList = useMemo(() => {
        if (courseListLength > 5) {
            return courseList.filter((course, index) => index < 5);
        }
    }, [courseList]);

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <section className={style.section}>
            <div className={`${style.section__wrap} container`}>
                <h2 className={style.section__title}>Каталог курсов</h2>
                <div className={style.section__list}>
                    {filteredCourseList.map(course => <Course item={course} key={course.id}/>)}
                </div>
            </div>
        </section>
    );
};
