import style from './Course.module.scss'

export const Course = ({item}) => {
    return (
        <article className={style.course}>
            <img src="" alt="Course-image"/>
            <div className={style.wrap}>
                <h3 className={style.title}>{item.title}</h3>
                <p className={style.summary}>{item.description}</p>
                <div className={style.author}>{item.author || 'Имя пользователя'}</div>
            </div>
        </article>
    );
};
