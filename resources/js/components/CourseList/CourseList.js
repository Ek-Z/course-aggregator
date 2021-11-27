import PropTypes from 'prop-types';
import { Course } from '../Course/Course';
import style from './CourseList.module.scss';

export const CourseList = ({ list }) => {
    return (
        <section className={style.section}>
            <div className={style.wrap}>
                <div className={style.grid}>
                    {list.map(item => <Course key={item.id} item={item}/>)}
                </div>
            </div>
        </section>
    );
};

CourseList.propTypes = {
    list: PropTypes.array,
};
