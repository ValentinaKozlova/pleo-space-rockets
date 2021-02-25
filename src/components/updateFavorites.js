export function getFavorites(name) {
    return localStorage && JSON.parse(localStorage.getItem(name));
}

function updateLocalStorage(name, favorites) {
    if (localStorage) {
        localStorage.removeItem(name)
        localStorage.setItem(name, JSON.stringify(favorites))
    } else {
        console.error("Your browser doesn't support localStorage"); // data could be added to cookies
    }
}

export function addToFavorites(dataIndex, flight_number, name, onOpen) {
    const favorites = getFavorites(name) || {};
    const key = `${name}_${dataIndex}`

    if (!favorites.hasOwnProperty(key)) {
        favorites[key] = flight_number
        updateLocalStorage(name, favorites)
        onOpen && onOpen()
    }
}

export function removeFromFavorites(dataIndex, name) {
    const favorites = getFavorites(name) || {};
    const key = `${name}_${dataIndex}`

    if (favorites.hasOwnProperty(key)) {
        delete favorites[key];
        updateLocalStorage(name, favorites)
    }
}