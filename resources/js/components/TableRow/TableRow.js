import PropTypes from 'prop-types';

export const TableRow = ({ item }) => {
    return (
        <>
            <tr style={{ textAlign: 'center'}}>
                {Object.keys(item).map(key => <td
                    key={key}
                    style={{border: '1px solid black'}}
                >{key}</td>)}
            </tr>
            <tr style={{ textAlign: 'center'}}>
                {Object.values(item).map(value => <td
                    key={value}
                    style={{border: '1px solid black'}}
                >{value}</td>)}
                <td>
                    <button
                        data-id={item.id}
                    >Редактировать</button>
                </td>
                <td>
                    <button
                        data-id={item.id}
                    >Удалить</button>
                </td>
            </tr>
        </>
    );
};

TableRow.propTypes = {
    item: PropTypes.object,
};
