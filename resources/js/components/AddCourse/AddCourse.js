import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { fetchData } from '../../utils/HOF/HOF';
import { ADMIN_COURSE_LIST_URL } from '../../utils/urls/urls';
import style from './AddCourse.module.scss';

export const AddCourse = () => {
    const [languages, setLanguages] = React.useState([]);
    const courseTitleRef = React.useRef(null);
    const courseLanguageRef = React.useRef(null);
    const courseShortDescriptionRef = React.useRef(null);
    const courseDescriptionRef = React.useRef(null);
    const courseProgrammingLanguageRef = React.useRef(null);
    const sourceNameRef = React.useRef(null);
    const sourceUrlRef = React.useRef(null);
    const courseImageRef = React.useRef(null);
    const history = useHistory();

    const getProgrammingLanguages = async () => {
        return await fetchData('/api/programmingLanguages');
    };

    const addNewCourse = async (evt) => {
        evt.preventDefault();

        if (!courseTitleRef.current?.value.trim() && !sourceUrlRef.current?.value.trim()) {
            courseTitleRef.current.value = '';
            sourceUrlRef.current.value = '';

            courseTitleRef.current.placeholder = 'Поле обязательно для заполнения';
            sourceUrlRef.current.placeholder = 'Поле обязательно для заполнения';

            return;
        }

        const newCourseData = {
            title: courseTitleRef.current?.value.trim(), // передаёт название курса (тип: строка)
            language: courseLanguageRef.current?.selectedOptions[0].value, // передаёт язык курса (тип: строка)
            short_description: courseShortDescriptionRef.current?.value.trim(), // передаёт краткое описание курса (тип: строка)
            description: courseDescriptionRef.current?.value.trim(), // передаёт полное описание курса (тип: строка)
            programmingLanguage_id: +courseProgrammingLanguageRef.current?.selectedOptions[0].id, // передаёт id языка программирования (тип: число)
            source_name: sourceNameRef.current?.value.trim(), //передаёт название источника курса (тип: строка)
            source_url: sourceUrlRef.current?.value.trim(), // передаёт ссылку источника курс (тип: строка)
            image: courseImageRef.current?.value // передаёт путь к картинке (тип: строка)
        };

        const userToken = JSON
            .parse(localStorage.getItem('userData'))
            .data
            .token;

        const response = await fetch(ADMIN_COURSE_LIST_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`
            },
            body: JSON.stringify(newCourseData)
        });

        console.log(response);

        if (response.status === 200) {
            alert('Курс успешно добавлен');
            history.push('/admin');
        }
    };

    React.useEffect(async () => {
        const languagesData = await getProgrammingLanguages();
        setLanguages(languagesData.data);
    }, []);

    return (
        <div className={`container ${style.wrap}`}>
            <form onSubmit={addNewCourse} className={style.form}>
                <label htmlFor="title">
                    Название курса
                    <input
                        id="title"
                        type="text"
                        name="title"
                        placeholder="Введите название курса"
                        ref={courseTitleRef}
                        required={true}
                    />
                </label>
                <label htmlFor="language">
                    Язык курса
                    <select name="language" id="language" ref={courseLanguageRef}>
                        <option id="1" value="Русский">Русский</option>
                        <option id="2" value="English">English</option>
                    </select>
                </label>
                <label htmlFor="short_description">
                    Краткое описание курса
                    <textarea
                        id="short_description"
                        name="short_description"
                        placeholder="Введите краткое описание курса"
                        ref={courseShortDescriptionRef}
                    />
                </label>
                <label htmlFor="description">
                    Полное описание курса
                    <textarea
                        id="description"
                        name="description"
                        placeholder="Введите полное описание курса"
                        ref={courseDescriptionRef}
                    />
                </label>
                <label htmlFor="prog_language">
                    Язык курса
                    <select name="prog_language" id="prog_language" ref={courseProgrammingLanguageRef}>
                        {languages.map(language => <option
                            key={language.id}
                            value={language.title}
                            id={language.id}
                        >
                            {language.title}
                        </option>)}
                    </select>
                </label>
                <label htmlFor="source_name">
                    Название источника
                    <input
                        id="source_name"
                        type="text"
                        name="source_name"
                        placeholder="Введите название источника"
                        ref={sourceNameRef}
                    />
                </label>
                <label htmlFor="source_url">
                    URL источника
                    <input
                        id="source_url"
                        type="text"
                        name="source_url"
                        placeholder="Введите URL источника"
                        ref={sourceUrlRef}
                        required={true}
                    />
                </label>
                <label htmlFor="image">
                    Фотограция курса
                    <input
                        id="image"
                        type="file"
                        alt="фотография курса"
                        accept="image/*"
                        name="image"
                        ref={courseImageRef}
                    />
                </label>
                <button
                    type="submit"
                    onClick={addNewCourse}
                >
                    Добавить курс
                </button>
                <button type="reset">Сбросить</button>
            </form>
        </div>
    );
};
