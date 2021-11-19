import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseList } from '../../components/CourseList/CourseList';
import { selectBestCourses, selectCourseListLength } from '../../store/courseList/selectors';
import { getPublicCourseList } from '../../store/courseList/action';
import style from './Home.module.scss';

export const Home = () => {
    const courseListLength = useSelector(selectCourseListLength);
    const bestCourseList = useSelector(selectBestCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: добавить проверку на админа
        !courseListLength && dispatch(getPublicCourseList());
        // dispatch(getAdminCourseList());
    }, [dispatch, courseListLength]);

    return (
        <div className="container">
            <h1 className={style.title}>
                Агрегатор бесплатных курсов
                <span>Мы собрали все бесплатные курсы по программированию</span>
            </h1>
            {/*<InputSearch className={style.input}/>*/}
            <CourseList list={bestCourseList}/>
        </div>
    );
};
