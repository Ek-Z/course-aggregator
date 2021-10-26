import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Route, Switch } from 'react-router-dom';
import { selectCourseList } from '../../store/courseList/selectors';
import { courseListFilter, getCourseList } from '../../store/courseList/action';
import { CourseCard } from '../../components/CourseCard/CourseCard';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);
    const { courseId } = useParams();
    const dispatch = useDispatch();

    const handleFilter = useCallback((value) => {
        dispatch(courseListFilter(value, courseList));
    });

    useEffect(() => {
        dispatch(getCourseList());
    }, []);

    return (
        <Switch>
            <Route exact={true} path="/courses">
                <div className="container" style={{ display: 'flex', marginTop: 50 }}>
                    <CourseFilter/>
                    <CourseList list={courseList}/>
                </div>
            </Route>
            <Route exact={true} path={`/courses/${courseId}`}>
                <CourseCard courseId={courseId}/>
            </Route>
        </Switch>
    );
};
