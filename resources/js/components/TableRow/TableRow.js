import PropTypes from 'prop-types';
import style from './TableRow.module.scss'

export const TableRow = ({ item }) => {
    return (
        <tr>
            {Object.values(item).map(value => <td
                key={value}
                className={style.row__cell}
            >{value}</td>)}
            <td>
                <button
                    data-id={item.id}
                >Редактировать
                </button>
            </td>
            <td>
                <button
                    data-id={item.id}
                >Удалить
                </button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
