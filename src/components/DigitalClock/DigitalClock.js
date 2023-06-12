import React, {useEffect, useState} from 'react';
import './DigitalClock.css';


function DigitalClock({showSeconds, timezone}) {

    const [loading, setLoading] = useState(false)
    const [localTimeString, setLocalTimeString] = useState('')
    const [hoursDisplay, setHoursDisplay] = useState([])
    const [minutesDisplay, setMinutesDisplay] = useState([])
    const [secondsDisplay, setSecondsDisplay] = useState([])

    useEffect(() => {
        function convertToLocalTime() {
            // exits if there is no timezone
            if (!timezone) return
            const localTime = new Date()
            // adds the local time string to state using the given timezone
            setLocalTimeString(localTime.toLocaleTimeString("en-GB", {timeZone: timezone, hour12: false}))
        }

        setLoading(true)

        // sets the interval to update the time every second
        const secondInterval = setInterval(() => {
            convertToLocalTime()

            setLoading(false)
        }, 1000)

        // clears the interval when the component unmounts
        return () => {
            console.log('unmounting')
            clearInterval(secondInterval)
        }

    }, [timezone])

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

                <article className="digital-clock">
                    {loading && <p className="loading-message">fetching local time</p>}
                    {!loading && hoursDisplay.length > 0 &&
                    <h3 className="display">
                        <span className="hour-display">
                            <span>{hoursDisplay[0]}</span>
                            <span>{hoursDisplay[1]}</span>
                        </span>
                        <span className="minutes-display">
                            <span>:</span>
                            <span>{minutesDisplay[0]}</span>
                            <span>{minutesDisplay[1]}</span>
                        </span>
                        {showSeconds &&
                            <span className="seconds-display">
                                <span>:</span>
                                <span className="seconds-left">{secondsDisplay[0]}</span>
                                <span className="seconds-right">{secondsDisplay[1]}</span>
                            </span>}
                    </h3>
                    }
                </article>
        </>

    );
}

export default DigitalClock;