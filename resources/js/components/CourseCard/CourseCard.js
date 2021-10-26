import { useMemo } from 'react';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { selectExactCourse } from '../../store/courseList/selectors';
import { CourseInfo } from '../CourseInfo/CourseInfo';

export const CourseCard = ({ courseId }) => {
    const selectCourse = useMemo(() => selectExactCourse(courseId), [courseId]);
    const course = useSelector(selectCourse);

    return (
        <Route exact path={`/courses/${courseId}`}>
            <CourseInfo item={course}/>
        </Route>
    );
};

CourseCard.propTypes = {
    courseId: PropTypes.string,
};
