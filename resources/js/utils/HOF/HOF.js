// high order function

function HOF (fn) {
    return (...args) => fn(...args);
}

async function fetchData (url) {
    const response = await fetch(url);

    if (!response.ok) {
        return new Error(`Error: ${response.statusText}`);
    }

    return await response
        .json()
        .then(json => json.data);
}

export const getData = HOF(fetchData);

