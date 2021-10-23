import PropTypes from 'prop-types';
import { TableRow } from '../TableRow/TableRow';

export const AdminTable = ({ table }) => {
    return (
        <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
            {table.map(el => el ? <TableRow key={el.id} item={el}/> : null)}
            </tbody>
        </table>
    );
};

AdminTable.propTypes = {
    table: PropTypes.array,
};
