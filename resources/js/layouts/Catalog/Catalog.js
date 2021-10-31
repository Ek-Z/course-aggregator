import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCourseList } from '../../store/courseList/selectors';
import { getPublicCourseList, getAdminCourseList } from '../../store/courseList/action';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';

export const Catalog = () => {
    const courseList = useSelector(selectCourseList);
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: добавить проверку на админа
        /*dispatch(getPublicCourseList());*/
        dispatch(getAdminCourseList());
    }, [dispatch]);

    return (
        <div className="container" style={{ display: 'flex', marginTop: 50 }}>
            <CourseFilter/>
            <CourseList list={courseList}/>
        </div>
    );
};
