import React, {useContext, useEffect, useState} from 'react';
import {UserPreferencesContext} from "../../context/UserPreferencesContextProvider";
import './DigitalClock.css';


function DigitalClock({className, showSeconds, timezone, setToUtc}) {


    // sets the states
    const [loading, setLoading] = useState(false)
    const [localTimeString, setLocalTimeString] = useState('')
    const [hoursDisplay, setHoursDisplay] = useState([])
    const [minutesDisplay, setMinutesDisplay] = useState([])
    const [secondsDisplay, setSecondsDisplay] = useState([])

    // gets the clock settings from the context
    const {clockSettings} = useContext(UserPreferencesContext)


    useEffect(() => {
        function convertToLocalTime() {

            // if the timezone is not given, and setToUtc is true, sets the timezone to UTC for group clocks
            if (!timezone && setToUtc) {
                timezone = 'UTC'
            }

            // exits if there is no timezone
            if (!timezone) return

            const localTime = new Date()
            // adds the local time string to state using the given timezone
            setLocalTimeString(localTime.toLocaleTimeString("en-GB", {
                timeZone: timezone,
                hour12: clockSettings['12hourFormat']
            }))
        }

        setLoading(true)

        // sets the interval to update the time every second
        const secondInterval = setInterval(() => {
            convertToLocalTime()

            setLoading(false)
        }, 1000)

        // clears the interval when the component unmounts
        return () => {
            clearInterval(secondInterval)
        }

    }, [timezone, clockSettings['12hourFormat']])


    // updates the display states when the local time string changes
    useEffect(() => {
            // splits the local time string into an array of numbers so each digit can be styled individually
            function splitTimeString() {
                const splitTime = localTimeString.split(':')
                // checks if the seconds exist before setting the state
                if (splitTime[2]) {
                    setHoursDisplay(splitTime[0].split(''))
                    setMinutesDisplay(splitTime[1].split(''))
                    setSecondsDisplay(splitTime[2].split(''))
                }
            }

            splitTimeString()
        }

        ,
        [localTimeString])


    return (
        <>
            {/*only displays the clock if the hours exist*/}

            <article className={`digital-clock ${className}`}>
                {loading && <p className="loading-message">fetching local time</p>}
                {!loading && hoursDisplay.length > 0 &&
                    <p className="display">
                        <span className="hour-display">
                            <span>{hoursDisplay[0]}</span>
                            <span>{hoursDisplay[1]}</span>
                        </span>
                        <span className="minutes-display">
                            <span>:</span>
                            <span>{minutesDisplay[0]}</span>
                            <span>{minutesDisplay[1]}</span>
                        </span>
                        {showSeconds && !clockSettings['12hourFormat'] &&
                            <span className="seconds-display">
                                <span>:</span>
                                <span className="seconds-left">{secondsDisplay[0]}</span>
                                <span className="seconds-right">{secondsDisplay[1]}</span>
                            </span>}
                        {clockSettings['12hourFormat'] &&
                            <span className="am-pm-display">
                                <span>{localTimeString.slice(-2)}</span>
                            </span>}
                    </p>
                }
            </article>
        </>

    );
}

export default DigitalClock;