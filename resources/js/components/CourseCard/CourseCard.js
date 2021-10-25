export const CourseCard = ({ item }) => {
    return (
        <article style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
                <img src={item.image} alt="green iguana"/>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>{item.source}</div>
        </article>
    );
};
