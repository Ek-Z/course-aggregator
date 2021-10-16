import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList } from '../../../store/courseList/selectors';
import { Course } from '../Course/Course';
import { getCourseList } from '../../../store/courseList/action';

export const CourseList = () => {
    const courseList = useSelector(selectCourseList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <section>
            <h2>Каталог курсов</h2>
            {courseList.map(course => <Course item={course} key={course.id}/>)}
        </section>
    );
};
