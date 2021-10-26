import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectExactCourse } from '../../store/courseList/selectors';

export const CourseCard = ({ courseId }) => {
    const selectCourse = useMemo(() => selectExactCourse(courseId), [courseId]);
    const course = useSelector(selectCourse);

    return (
        <Route exact path={`/courses/${courseId}`}>
            <article style={{ display: 'flex', flexDirection: 'column' }} data-course-id={course.id}>
                <img src={course.image} alt="green iguana"/>
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <div>{course.source}</div>
                <div>{course.language}</div>
            </article>
        </Route>
    );
};
