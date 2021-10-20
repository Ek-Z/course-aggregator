import style from './CourseFilter.module.scss';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectFilters } from '../../store/courseList/selectors';
import { Filter } from './Filter/Filter';

const parseArrToObj = (filters) => {
    const filtersObj = {};
    for (const [key, value] of Object.entries(filters)) {
        const filter = {};
        value.forEach((option) => (filter[option] = false));
        filtersObj[key] = filter;
    }
    return filtersObj;
};

export const CourseFilter = ({ onSubmit }) => {
    const filters = useSelector(selectFilters);
    const [filtersObj, setFiltersObj] = useState(parseArrToObj(filters));

    const handleSubmit = (evt) => {
        evt.preventDefault();
        console.log(filtersObj);
    };

    const handleChangeOptions = ({ filterName, filterOption }) => {
        setFiltersObj((prev) => {
            const newState = { ...filtersObj };
            newState[filterName][filterOption] = !newState[filterName][filterOption];
            return newState;
        });
    };

    const FiltersList = () => {
        const filters = [];
        for (const [key, value] of Object.entries(filtersObj)) {
            filters.push(<Filter key={key} filterName={key} filterOptions={value} onChange={handleChangeOptions} />);
        }
        return filters;
    };

    return (
        <div className={style.filter__container}>
            <form action="#" onSubmit={handleSubmit}>
                {FiltersList().map((el) => el)}
                <button type="submit">Поиск</button>
            </form>
        </div>
    );
};

/* 

filters = {
    "Языки программирования": ['PHP','JavaScript'],
    "Языки курса": ['Русский', 'Английский']
}

filtersObj = {
    "Языки программирования": {
        PHP: false,
        JavaScript: false,
    },
    "Языки курса": {
        Русский: false,
        Английский: false
    }
}

*/
