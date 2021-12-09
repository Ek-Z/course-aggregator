import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteSelectedCourse } from '../../store/admin/action';
import { getAdminCourseList } from '../../store/courseList/action';
import { selectCurrentPage } from '../../store/pages/selectors';
import style from './TableRow.module.scss';
import {Tooltip} from "@mui/material";
import * as React from "react";

export const TableRow = ({ item }) => {
    const currentPage = useSelector(selectCurrentPage);
    const dispatch = useDispatch();

    const handleCourseDelete = () => {
        const userToken = JSON
            .parse(localStorage.getItem('userData'))
            .data
            .token;

        dispatch(deleteSelectedCourse(item.id, userToken));

        alert('Курс успешно удалён');

        dispatch(getAdminCourseList(currentPage));
    };

    return (
        <tr>
            {Object.values(item).map((value, index) => <td
                key={index}
                className={style.row__cell}
            >
                {typeof value === 'object' ? value?.id : value}
            </td>)
            }
            <td>
                <Link to={`/admin/edit_course/${item.id}`}>
                    <Tooltip title="Редактировать">
                        <button className={style.row__btn}>
                            <img src="https://img.icons8.com/android/13/FFFFFF/pencil.png" />
                        </button>
                    </Tooltip>
                </Link>
            </td>
            <td>
                <Tooltip title="Удалить">
                    <button onClick={handleCourseDelete} className={style.row__btn}>
                        <img src="https://img.icons8.com/ios-glyphs/13/FFFFFF/delete-sign.png" />
                    </button>
                </Tooltip>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
