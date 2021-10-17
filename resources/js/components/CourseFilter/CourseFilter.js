import { useState } from 'react';
import style from './CourseFilter.module.scss';

export const CourseFilter = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const handleChange = (evt) => {
        setValue(evt.target.value);
    };

    const handleSubmit = (evt) => {
        evt.preventDefault;
        onSubmit(value);
        setValue('');
    };

    return (
        <form action="#" onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange}/>
            <button type="submit">Поиск</button>
        </form>
    );
};
