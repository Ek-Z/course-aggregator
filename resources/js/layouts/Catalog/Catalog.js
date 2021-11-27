import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import {
    selectCourseList,
    selectCourseListLength, selectFilterPath, selectIsFiltered,
    selectProgrammingLanguages, selectStatus
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import { getPublicCourseList, setFilterClear } from '../../store/courseList/action';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import { getCurrentPage, getPagesOfCourseList } from '../../store/pages/action';
import { selectCurrentPage, selectLastPage } from '../../store/pages/selectors';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import { STATUSES } from '../../utils/statuses/statuses';
import { URLS } from '../../utils/urls/urls';
import style from './Catalog.module.scss';

export const Catalog = () => {
    const programmingLanguages = useSelector(selectProgrammingLanguages);
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);
    const status = useSelector(selectStatus);
    const filterPath = useSelector(selectFilterPath);
    const isFiltered = useSelector(selectIsFiltered);
    const dispatch = useDispatch();

    const handlePageChange = (_, pageNumber) => dispatch(getCurrentPage(pageNumber, filterPath));

    useEffect(() => {
        dispatch(getPagesOfCourseList(URLS.PUBLIC_COURSELIST));
        dispatch(getPublicCourseList(currentPage));

        return () => {
            !!programmingLanguages && dispatch(setFilterClear(programmingLanguages));
        };
    }, []);

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
                            onChange={handlePageChange}
                />
            </div>
        </section>
    );
};
