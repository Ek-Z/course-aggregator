import * as React from 'react';
import { Redirect } from 'react-router-dom';
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
import { URLS } from '../../utils/urls/urls';
import { STATUSES } from '../../utils/statuses/statuses';
import { ProgressLoader } from '../../components/ProgressLoader/ProgressLoader';
import { selectIsAdmin } from '../../store/session/selectors';
import style from './AdminPanel.module.scss';

export const AdminPanel = () => {
    const titles = useSelector(selectCourseTitles);
    const courses = useSelector(selectCourseList);
    const currentPage = useSelector(selectCurrentPage);
    const lastPage = useSelector(selectLastPage);
    const status = useSelector(selectStatus);
    const isAdmin = useSelector(selectIsAdmin);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getPagesOfCourseList(URLS.ADMIN_COURSELIST));
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(getAdminCourseList(currentPage));
    }, [dispatch, currentPage]);

    if (!isAdmin) {
        return <Redirect to="/"/>;
    }

    return (
        <div className={style.wrap}>
            <h3 className={style.title}>Администрирование курсов</h3>
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
