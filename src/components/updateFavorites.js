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

export function addToFavorites(favoritesGroup, name, flight_number, onOpen) {
    const favorites = getFavorites(favoritesGroup) || {};

    if (!favorites.hasOwnProperty(name)) {
        favorites[name] = flight_number
        updateLocalStorage(favoritesGroup, favorites)
        onOpen && onOpen()
    }
}

export function removeFromFavorites(favoritesGroup, name) {
    const favorites = getFavorites(favoritesGroup) || {};

    if (favorites.hasOwnProperty(name)) {
        delete favorites[name];
        updateLocalStorage(favoritesGroup, favorites)
    }
}