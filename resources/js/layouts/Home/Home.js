import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseList } from '../../components/CourseList/CourseList';
import { selectBestCourses } from '../../store/courseList/selectors';
import { getPublicCourseList } from '../../store/courseList/action';
import style from './Home.module.scss';
import InputSearch from "../../components/InputSearch/InputSearch";

export const Home = () => {
    const bestCourseList = useSelector(selectBestCourses);
    const dispatch = useDispatch();

    useEffect(() => {
        //TODO: добавить проверку на админа
        dispatch(getPublicCourseList());
        // dispatch(getAdminCourseList());
    }, [dispatch]);

    return (
        <div className="container">
            <h1 className={style.title}>Агрегатор бесплатных курсов</h1>
            <InputSearch className={style.input}/>
            <CourseList list={bestCourseList}/>
        </div>
    );
};
