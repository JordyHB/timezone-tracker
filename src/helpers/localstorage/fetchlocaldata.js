// functions that retrieve from local storage
export function retrieveClockSettingsLocalStorage() {
    // if there is a saved clockSettings object in local storage, return it, otherwise return a default object
    if (localStorage.getItem('savedClockSettings')) {
        return JSON.parse(localStorage.getItem('savedClockSettings'))
    } else {
        return {
            '12hourFormat': false,
        }
    }
}

export function retrieveShownTimeTilesLocalStorage() {
    // if there is a saved preferred timezones array in local storage, return it, otherwise return a default array
    if (localStorage.getItem('savedShownTimeTiles')) {
        return JSON.parse(localStorage.getItem('savedShownTimeTiles'))
    } else {
        return ['Europe/London', 'Asia/Shanghai', 'America/New_York', 'Australia/Sydney', 'America/Vancouver', 'Europe/Moscow']
    }
}