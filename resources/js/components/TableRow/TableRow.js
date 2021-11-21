import PropTypes from 'prop-types';
import style from './TableRow.module.scss';

export const TableRow = ({ item }) => {
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
                <button data-id={item.id}>Удалить</button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
