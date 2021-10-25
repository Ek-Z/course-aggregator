import { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getExactCourse } from '../../store/courseCard/action';

export const CourseCard = ({ courseId }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getExactCourse(courseId));
    }, []);

    return (
        <Route exact path={`/courses/${courseId}`}>
            <article style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <img src="image" alt="green iguana"/>
                </div>
                <h3>Title</h3>
                <p>Description</p>
                <div>Sourse</div>
            </article>
        </Route>
    );
};
