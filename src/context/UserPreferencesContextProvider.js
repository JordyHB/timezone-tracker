import React, {createContext, useEffect, useState} from 'react';
import {
    retrieveClockSettingsLocalStorage,
    retrieveShownTimeTilesLocalStorage
} from "../helpers/localstorage/fetchlocaldata";


export const UserPreferencesContext = createContext({
    clockSettings: {
        '12hoursFormat': false,
    },
    shownTimeTiles: [],
    toggleClockSettings: () => {
    },
    changeShownTimeTiles: () => {
    }
})

function UserPreferencesContextProvider({children}) {

    const [clockSettings, setClockSettings] = useState(retrieveClockSettingsLocalStorage)
    const [shownTimeTiles, setShownTimeTiles] = useState(retrieveShownTimeTilesLocalStorage)

    // functions that update the context
    function toggleClockSettings() {
        setClockSettings((prevSettings) => ({
            ...prevSettings,
            '12hourFormat': !prevSettings['12hourFormat'],
        }))
    }

    function changeShownTimeTiles(oldTile, newTile) {
        setShownTimeTiles( (prevShownTimeTiles) => {
            const updatedTimeTiles = [...prevShownTimeTiles],
            updatedIndex = updatedTimeTiles.indexOf(oldTile)
            updatedTimeTiles[updatedIndex] = newTile
            return updatedTimeTiles
        })
    }

    // useEffects that save to local storage
    useEffect(() => {
        // on clockSettings change, save to local storage
        localStorage.setItem('savedClockSettings', JSON.stringify(clockSettings))
    }, [clockSettings])

    useEffect(() => {
        // on shownTimeTiles change, save to local storage
        localStorage.setItem('savedShownTimeTiles', JSON.stringify(shownTimeTiles))
    }, [shownTimeTiles])


    return (
        <UserPreferencesContext.Provider value={
            {
                clockSettings: clockSettings,
                shownTimeTiles: shownTimeTiles,
                toggleClockSettings: toggleClockSettings,
                changeShownTimeTiles: changeShownTimeTiles
            }
        }>
            {children}
        </UserPreferencesContext.Provider>
    );
}

export default UserPreferencesContextProvider;