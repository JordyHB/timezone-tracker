import React, {useEffect, useState} from 'react';
import './DigitalClock.css';


function DigitalClock({showSeconds, timezone}) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [localTimeString, setLocalTimeString] = useState('')
    const [hoursDisplay, setHoursDisplay] = useState([])
    const [minutesDisplay, setMinutesDisplay] = useState([])
    const [secondsDisplay, setSecondsDisplay] = useState([])

    useEffect(() => {
        function convertToLocalTime() {
            if (!timezone) return
            const localTime = new Date()
            setLocalTimeString(localTime.toLocaleTimeString("en-GB", {timeZone: timezone, hour12: false}))
        }

        setLoading(true)


        const secondInterval = setInterval(() => {
            convertToLocalTime()

            setLoading(false)
        }, 1000)

        return () => {
            console.log('unmounting')
            clearInterval(secondInterval)
        }

    }, [timezone])

    useEffect(() => {
            function splitTimeString() {
                const splitTime = localTimeString.split(':')
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
            {loading && <p>fetching local time</p>}
            {hoursDisplay[1] && <article className="digital-clock">
                <h1 className="display">
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
                </h1>
            </article>}
        </>

    );
}

export default DigitalClock;