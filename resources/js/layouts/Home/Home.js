import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CourseList } from '../../components/CourseList/CourseList';
import {
    selectCourseList,
    selectCourseListLength,
    selectStatus
} from '../../store/courseList/selectors';
import { getLastCourses } from '../../store/courseList/action';
import style from './Home.module.scss';
import { STATUSES } from '../../utils/statuses/statuses';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';

export const Home = () => {
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!courseListLength) {
            dispatch(getLastCourses());
        } else {
            courseListLength > 6 && dispatch(getLastCourses());
        }
    }, [dispatch, courseListLength]);

    return (
        <div className="container">
            <h1 className={style.title}>
                Агрегатор бесплатных курсов
                <span>Мы собрали все бесплатные курсы по программированию</span>
            </h1>
            {status === STATUSES.REQUEST ?
                <ProgressLoader/> :
                <CourseList list={courseList}/>
            }
        </div>
    );
};
