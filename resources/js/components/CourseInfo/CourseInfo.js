import PropTypes from 'prop-types';

export const CourseInfo = ({ item }) => {
    return (
        <article style={{ display: 'flex', flexDirection: 'column' }} data-course-id={item.id}>
            <img src={item.image} alt="green iguana"/>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>{item.source}</div>
            <div>{item.language}</div>
        </article>
    );
};

CourseInfo.propTypes = {
    item: PropTypes.object,
};
