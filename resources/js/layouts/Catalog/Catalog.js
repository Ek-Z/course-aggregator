import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectCourseList,
    selectCourseListLength,
    selectFilteredList, selectFilteredListLength,
    selectIsFiltered, selectProgrammingLanguages, selectStatus
} from '../../store/courseList/selectors';
import { CourseList } from '../../components/CourseList/CourseList';
import { CourseFilter } from '../../components/CourseFilter/CourseFilter';
import { getPublicCourseList, setFilterClear } from '../../store/courseList/action';
import { InputSearch } from '../../components/InputSearch/InputSearch';
import style from './Catalog.module.scss';
import { changePage, getPagesOfCourseList } from '../../store/pages/action';
import { selectCurrentPage, selectLastPage } from '../../store/pages/selectors';
import Pagination from '@mui/material/Pagination';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import { STATUSES } from '../../utils/statuses/statuses';

export const Catalog = () => {
    const filteredList = useSelector(selectFilteredList);
    const filteredListLength = useSelector(selectFilteredListLength);
    const programmingLanguages = useSelector(selectProgrammingLanguages);
    const isFiltered = useSelector(selectIsFiltered);
    const courseList = useSelector(selectCourseList);
    const courseListLength = useSelector(selectCourseListLength);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    const handleChange = (event, newPage) => dispatch(changePage(newPage));

    useEffect(() => {
        dispatch(getPagesOfCourseList());

        return () => {
            !!programmingLanguages && dispatch(setFilterClear(programmingLanguages));
        };
    }, []);

    /*useEffect(() => {
        dispatch(getPublicCourseList(currentPage));
    }, [dispatch, currentPage]);*/

    useEffect(() => {
        (!courseListLength || !filteredListLength) && dispatch(getPublicCourseList(currentPage));
    }, [dispatch, courseListLength, filteredListLength, currentPage]);

    return (
        <section className={style.catalog}>
            <div className={`container ${style.wrap}`}>
                <h2 className={style.title}>Список бесплатных курсов</h2>
                <InputSearch/>
                <div className={style.list}>
                    <CourseFilter/>
                    {status === STATUSES.REQUEST ?
                        <ProgressLoader/> :
                        <>
                            {isFiltered ? <CourseList list={filteredList}/> : <CourseList list={courseList}/>}
                        </>
                    }
                </div>
                <Pagination className={style.pagination}
                            key={`button-${currentPage}`}
                            count={lastPage}
                            defaultPage={currentPage}
                            onChange={handleChange}
                />
            </div>

        </section>
    );
};
