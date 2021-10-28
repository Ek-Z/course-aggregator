import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList } from '../../store/courseList/selectors';
import { getCourseList } from '../../store/courseList/action';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCourseList());
    }, [dispatch]);

    return (
        <div className="container" style={{ display: 'flex', marginTop: 50 }}>
            <CourseFilter/>
            <CourseList list={courseList}/>
        </div>
    );
};
