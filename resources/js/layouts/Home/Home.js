import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseList } from '../../components/CourseList/CourseList';
import { selectBestCourses } from '../../store/courseList/selectors';
import { getPublicCourseList } from '../../store/courseList/action';

export const Home = () => {
    const bestCourseList = useSelector(selectBestCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: добавить проверку на админа
        dispatch(getPublicCourseList());
        // dispatch(getAdminCourseList());
    }, [dispatch]);

    return (
        <div className={`container`}>
            <h1>Агрегатор бесплатных курсов</h1>
            <CourseList list={bestCourseList}/>
        </div>
    );
};
