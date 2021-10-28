import { useMemo } from 'react';
import { Route, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectExactCourse } from '../../store/courseList/selectors';
import { CourseInfo } from '../CourseInfo/CourseInfo';

export const CourseCard = () => {
    const { courseId } = useParams();
    const selectCourse = useMemo(() => selectExactCourse(courseId), [courseId]);
    const course = useSelector(selectCourse);

    return (
        <Route exact={true} path={`/courses/${courseId}`}>
            <CourseInfo item={course}/>
        </Route>
    );
};

CourseCard.propTypes = {
    courseId: PropTypes.string,
};
