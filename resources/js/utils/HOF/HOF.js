import { PUBLIC_COURSES_LIST_URL } from '../urls/urls';

export async function fetchData (url) {
    const response = await fetch(url);

    if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
    }

    return await response
        .json()
        .then(json => json.data);
}

export async function fetchMeta (url) {
    const response = await fetch(url);

    if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
    }

    return await response
        .json()
        .then(json => json.meta);
}


export function setDefaultFilterState (filters) {
    let statefulFilters = [];

    for (let filter of filters) {
        filter = { ...filter, state: false };
        statefulFilters = [...statefulFilters, filter];
    }

    return statefulFilters;
}

export function checkFilterState (filters) {
    let selectedFilters = {};

    for (const filtersKey in filters) {
        const selectedFilter = filters[filtersKey].filter(filter => filter.state === true);
        selectedFilters = { ...selectedFilters, [filtersKey]: selectedFilter };
        if (!selectedFilters[filtersKey].length) delete selectedFilters[filtersKey];
    }

    return selectedFilters;
}

export async function setFilterPath (selectedFilters) {
    let filterPath = [];

    for (const selectedFiltersKey in selectedFilters) {
        let languages = [];
        let programmingLanguages = [];

        switch (selectedFiltersKey) {
            case 'Языки курсов':
                for (const language of selectedFilters[selectedFiltersKey]) {
                    languages = [...languages, language.title];
                }
                filterPath = [...filterPath, `filter[language]=${languages.join(',')}`];
                break;

            case 'Языки программирования':
                for (const programmingLanguage of selectedFilters[selectedFiltersKey]) {
                    programmingLanguages = [...programmingLanguages, programmingLanguage.id];
                }
                filterPath = [...filterPath, `filter[programmingLanguage_id]=${programmingLanguages.join(',')}`];
                break;

            case 'Заголовок':
                filterPath = [...filterPath, `filter[title]=${selectedFilters[selectedFiltersKey]}`];
                break;

            default:
                break;
        }
    }

    return await fetchData(`${PUBLIC_COURSES_LIST_URL}?${filterPath.join('&')}`);
}
