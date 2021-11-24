import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@mui/material';
import { AdminTable } from '../../components/AdminTable/AdminTable';
import {
    selectCourseList,
    selectCourseTitles,
    selectStatus
} from '../../store/courseList/selectors';
import { getAdminCourseList } from '../../store/courseList/action';
import { selectCurrentPage, selectLastPage } from '../../store/pages/selectors';
import { changePage, getPagesOfCourseList } from '../../store/pages/action';
import { ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import { STATUSES } from '../../utils/statuses/statuses';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import style from './AdminPanel.module.scss';
import { selectIsAdmin } from '../../store/session/selectors';
import { Redirect } from 'react-router-dom';

export const AdminPanel = () => {
    const titles = useSelector(selectCourseTitles);
    const courses = useSelector(selectCourseList);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);
    const status = useSelector(selectStatus);
    const isAdmin = useSelector(selectIsAdmin);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getPagesOfCourseList(ADMIN_COURSE_LIST_URL));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getAdminCourseList(currentPage));
    }, [dispatch, currentPage]);

    if (!isAdmin) {
        return <Redirect to="/"/>;
    }

    return (
        <div className={style.wrap}>
            <h3>Это admin Page</h3>
            {status === STATUSES.REQUEST ?
                <ProgressLoader/> :
                <AdminTable titles={titles} table={courses}/>
            }
            <Pagination className={style.pagination}
                        key={`button-${currentPage}`}
                        count={lastPage}
                        defaultPage={currentPage}
                        onChange={(event, newPage) => dispatch(changePage(newPage))}
            />
        </div>
    );
};
