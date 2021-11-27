import PropTypes from 'prop-types';
import { Course } from '../Course/Course';
import style from './CourseList.module.scss';

export const CourseList = ({ list }) => {
    return (
        <section className={style.section}>
            <div className={style.section__wrap}>
                <div className={style.box}>
                    <div className={style.conteiner}>
                        {list.map(item => <Course key={item.id} item={item}/>)}
                    </div>
                </div>
            </div>
        </section>
    );
};

CourseList.propTypes = {
    list: PropTypes.array,
};
