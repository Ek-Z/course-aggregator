import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import {
    selectCourseList,
    selectCourseListLength, selectFilterPath,
    selectProgrammingLanguages, selectStatus
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import { getPublicCourseList, setFilterClear } from '../../store/courseList/action';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import style from './Catalog.module.scss';
import { changePage, getPagesOfCourseList } from '../../store/pages/action';
import { selectCurrentPage, selectLastPage } from '../../store/pages/selectors';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import { STATUSES } from '../../utils/statuses/statuses';
import { PUBLIC_COURSES_LIST_URL } from '../../utils/urls/urls';

export const Catalog = () => {
    const programmingLanguages = useSelector(selectProgrammingLanguages);
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);
    const status = useSelector(selectStatus);
    const filter = useSelector(selectFilterPath);
    console.log('filter:', filter);
    const dispatch = useDispatch();
    const { filterPath } = useParams();
    console.log('filterPath:', filterPath);

    useEffect(() => {
        dispatch(getPagesOfCourseList(PUBLIC_COURSES_LIST_URL));

        return () => {
            !!programmingLanguages && dispatch(setFilterClear(programmingLanguages));
        };
    }, []);

    useEffect(() => {
        dispatch(getPublicCourseList(currentPage));
    }, [dispatch, currentPage]);

    useEffect(() => {
        !courseListLength && dispatch(getPublicCourseList(currentPage));
    }, [dispatch, courseListLength, currentPage]);

    return (
        <section className={style.catalog}>
            <div className={`container ${style.wrap}`}>
                <h2 className={style.title}>Список бесплатных курсов</h2>
                <InputSearch/>
                <div className={style.list}>
                    <CourseFilter/>
                    {status === STATUSES.REQUEST ?
                        <ProgressLoader/> :
                        <CourseList list={courseList}/>
                    }
                </div>
                <Pagination className={style.pagination}
                            key={`button-${currentPage}`}
                            count={lastPage}
                            defaultPage={currentPage}
                            onChange={
                                (event, newPage) => dispatch(changePage(newPage))
                            }
                />
            </div>
        </section>
    );
};
