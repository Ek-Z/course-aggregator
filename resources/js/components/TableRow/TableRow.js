import PropTypes from 'prop-types';
import style from './TableRow.module.scss';
import { ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';

export const TableRow = ({ item }) => {
    const deleteCourse = () => {
        const userToken = JSON
            .parse(localStorage.getItem('userData'))
            .data
            .token;
        console.log(item.id);
        fetch(`${ADMIN_COURSE_LIST_URL}/${item.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `${userToken}`,
                'x-csrf-token': document.querySelector("[name='csrf-token']").getAttribute('content')
            }
        }).then(() => {
            alert('Курс успешно удалён');
        })

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
                <button onClick={deleteCourse}>Удалить</button>
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
