export function getFavorites(name) {
    return JSON.parse(localStorage.getItem(name));
}
export function updateFavorites(dataIndex, name) {
    const favorites = getFavorites(name) || {};
    const key = `${name}_${dataIndex}`

    if (favorites && favorites.hasOwnProperty(key)) {
        delete favorites[key];
    } else {
        favorites[key] = dataIndex
    }
    localStorage.removeItem(name)
    localStorage.setItem(name, JSON.stringify(favorites))
}