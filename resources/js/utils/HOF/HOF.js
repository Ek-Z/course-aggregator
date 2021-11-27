export async function fetchData (url) {
    const response = await fetch(url);

    if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
    }

    return await response
        .json()
        .then(json => ({ data: json.data, meta: json.meta }));
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

export function setFilterPath (selectedFilters) {
    if(!Object.values(selectedFilters).length) return '';

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

    return filterPath.join('&');
}
