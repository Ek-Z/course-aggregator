import style from './Course.module.scss'

export const Course = ({item}) => {
    return (
        <article className={style.course}>
            <img src="" alt="Course-image"/>
            <div className={style.course__wrap}>
                <h3 className={style.course__title}>{item.title}</h3>
                <p className={style.course__summary}>{item.description}</p>
                <div className={style.course__author}>{item.author || 'Имя пользователя'}</div>
            </div>
        </article>
    );
};
