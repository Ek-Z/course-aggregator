import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TableRow } from '../TableRow/TableRow';
import style from './AdminTable.module.scss';

export const AdminTable = ({ titles, table }) => {
    return (
        <>
            <Link to="/admin/addCourse">
                <button>Добавить курс</button>
            </Link>
            <table className={style.table}>
                <tbody>
                <tr>
                    {titles.map(
                        (title, index) => <td key={index} className={style.row__cell}>{title}</td>
                    )}
                </tr>
                {table.map(
                    el => el ? <TableRow key={el.id} item={el}/> : null
                )}
                </tbody>
            </table>
        </>
    );
};

AdminTable.propTypes = {
    titles: PropTypes.array,
    table: PropTypes.array,
};
