import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Billboard } from '../../components/Billboard/Billboard';
import { CourseList } from '../../components/CourseList/CourseList';
import {
    selectCourseList,
    selectCourseListLength,
    selectStatus
} from '../../store/courseList/selectors';
import { getLastCourses } from '../../store/courseList/action';
import { STATUSES } from '../../utils/statuses/statuses';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import style from './Home.module.scss';

export const Home = () => {
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!courseListLength) {
            dispatch(getLastCourses());
        } else {
            courseListLength !== 6 && dispatch(getLastCourses());
        }
    }, [dispatch, courseListLength]);

    return (
        <div className="container">
            <Billboard />
            <h3 className={style.title}>Новые курсы</h3>
            {status === STATUSES.REQUEST ?
                <ProgressLoader /> :
                <CourseList list={courseList} />
            }
        </div>
    );
};
