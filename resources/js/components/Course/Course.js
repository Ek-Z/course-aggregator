import style from './Course.module.scss'

export const Course = () => {
    return (
        <article className={style.course}>
            <img src="" alt="Course-image"/>
            <div className={style.wrap}>
                <h3 className={style.title}>Название курса</h3>
                <p className={style.summary}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusamus alias aut autem cumque dolor
                    ea eligendi esse est eveniet excepturi hic in ipsum iure laudantium, minima necessitatibus nihil
                    nulla optio pariatur praesentium quae quasi, repellat sequi tempora, veniam veritatis vero
                    voluptatibus voluptatum! Fugit molestias odio quas quo sint!</p>
                <div className={style.author}>Имя пользователя</div>
            </div>
        </article>
    );
};
