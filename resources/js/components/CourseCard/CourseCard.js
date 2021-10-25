import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { EXACT_COURSE_URL } from '../../../urls/urls';

export const CourseCard = ({ courseId }) => {
    //TODO: упростить получение курса, ибо при рендере новой карточки инфа подгружается с запозданием
    const [course, setCourse] = useState({});

    const getCourseInfo = async (courseId) => {
        try {
            const response = await fetch(`${EXACT_COURSE_URL}/${courseId}`);

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const result = await response
                .json()
                .then(json => json.data);
            setCourse(result);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getCourseInfo(courseId);
    }, []);

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
