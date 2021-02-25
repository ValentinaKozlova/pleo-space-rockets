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
export function updateFavorites(dataIndex, name, onOpen) {
    const favorites = getFavorites(name) || {};
    const key = `${name}_${dataIndex}`

    if (favorites && favorites.hasOwnProperty(key)) {
        delete favorites[key];
        updateLocalStorage(name, favorites)
    } else {
        favorites[key] = dataIndex
        updateLocalStorage(name, favorites)
        onOpen && onOpen()
    }
}