import React, {createContext, useEffect, useState} from 'react';


export const ClockSettingsContext = createContext({
    clockSettings:{
        '12hoursFormat': false,
    },
    toggleClockSettings: () => {
    }
})

function ClockSettingsContextProvider({children}) {

    const [clockSettings, setClockSettings] = useState(null)

    useEffect(() => {
        // on mount fetch clock settings from local storage
        setClockSettings(JSON.parse(localStorage.getItem('clockSettings')))

        // if no settings are saved, set default settings
        setClockSettings({
            '12hoursFormat': true,
        })
    }, [])


    function toggleClockSettings() {
        setClockSettings((prevSettings) => ({
            ...prevSettings,
            '12hourFormat': !prevSettings['12hourFormat'],
        }))

    }


    useEffect(() => {
        // on clockSettings change, save to local storage
        localStorage.setItem('clockSettings', JSON.stringify(clockSettings))
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