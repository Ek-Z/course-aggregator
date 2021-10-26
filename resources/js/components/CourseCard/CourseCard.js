import { Route } from 'react-router-dom';

export const CourseCard = ({ courseId }) => {


    return (
        <Route exact path={`/courses/${courseId}`}>
            <article style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <img src="image" alt="green iguana"/>
                </div>
                <h3>Title</h3>
                <p>Description</p>
                <div>Sourse</div>
            </article>
        </Route>
    );
};
