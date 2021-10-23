export const TableRow = ({ item }) => {
    return (
        <tr>
            {item.map(el => el ? <td>{el}</td> : null)}
        </tr>
    );
};
