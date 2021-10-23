import PropTypes from 'prop-types';
import { TableRow } from '../TableRow/TableRow';

export const AdminTable = ({ titles, table }) => {
    return (
        <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
            <tr>
                {titles.map(
                    title => <td key={title} style={{ border: '1px solid black', textAlign: 'center' }}>{title}</td>
                )}
            </tr>
            {table.map(
                el => el ? <TableRow key={el.id} item={el}/> : null
            )}
            </tbody>
        </table>
    );
};

AdminTable.propTypes = {
    titles: PropTypes.array,
    table: PropTypes.array,
};
