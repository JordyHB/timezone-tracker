import React, {createContext, useEffect, useState} from 'react';


export const ClockSettingsContext = createContext({
    clockSettings: {
        '12hoursFormat': false,
    },
    toggleClockSettings: () => {
    }
})

function ClockSettingsContextProvider({children}) {

    const [clockSettings, setClockSettings] = useState(retrieveLocalStorage)

    function retrieveLocalStorage() {
        // if there is a saved clockSettings object in local storage, return it, otherwise return a default object
        if (localStorage.getItem('savedClockSettings')) {
            return JSON.parse(localStorage.getItem('savedClockSettings'))
        } else {
            return {
                '12hourFormat': false,
            }
        }
    }

    function toggleClockSettings() {
        setClockSettings((prevSettings) => ({
            ...prevSettings,
            '12hourFormat': !prevSettings['12hourFormat'],
        }))

    }


    useEffect(() => {
        // on clockSettings change, save to local storage
        localStorage.setItem('savedClockSettings', JSON.stringify(clockSettings))
        console.log(clockSettings)
    }, [clockSettings])


    return (
        <ClockSettingsContext.Provider value={
            {
                clockSettings: clockSettings,
                toggleClockSettings: toggleClockSettings
            }
        }>
            {children}
        </ClockSettingsContext.Provider>
    );
}

export default ClockSettingsContextProvider;