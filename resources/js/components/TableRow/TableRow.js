import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteSelectedCourse } from '../../store/admin/action';
import { getAdminCourseList } from '../../store/courseList/action';
import { selectCurrentPage } from '../../store/pages/selectors';
import style from './TableRow.module.scss';

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
                    <button>Редактировать</button>
                </Link>
            </td>
            <td>
                <button onClick={handleCourseDelete}>Удалить</button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
