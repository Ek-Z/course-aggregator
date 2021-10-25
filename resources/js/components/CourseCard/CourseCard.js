import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getExactCourse } from '../../store/courseCard/action';
import { selectCourse } from '../../store/courseCard/selectors';

export const CourseCard = ({ courseId }) => {
    //TODO: упростить получение курса, ибо при рендере новой карточки инфа подгружается с запозданием
    const course = useSelector(selectCourse);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExactCourse(courseId));
    }, [dispatch]);

    return (
        <Route exact path={`/courses/${courseId}`}>
            {/*TODO: сделать отдельный компонент ~CourseCardInfo*/}
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
