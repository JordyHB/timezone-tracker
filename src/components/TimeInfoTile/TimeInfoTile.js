import React, {useEffect, useState} from 'react';
import axios from "axios";
import DigitalClock from "../DigitalClock/DigitalClock";
import './TimeInfoTile.css'

function TimeInfoTile({ timezone }) {

    const [timeData, setTimeData] = useState({})
    const [city, setCity] = useState('')
    const [date, setDate] = useState('')

    // takes the timezone data from the API and splits it into an array before extracting the city name
    function extractCityName() {
        // splits the timezone string into an array and extracts only the name of the city
        setCity(timezoneLocation.split('/')[1].replace('_', ' '))
    }

    function extractDate() {
        // removes the milliseconds from the datetime string and converts it to a date object
        const fixedDateTime = datetime.split('.')[0]
        const dateObj = new Date(fixedDateTime)
        const date = dateObj.getDate()
        // converts the day of the week from a number to a string
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        setDate(`${days[day_of_week]}, ${date}`)
    }

    useEffect(() => {

        async function fetchTimeData() {
            try {
                const {data} = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`)
                setTimeData(data)
            } catch (e) {
                console.error(e)
            }
        }

        // checks every minute to see if the date has changed
        const EveryMinUpdate = setInterval(() => {
            // if the date exists, the date is extracted again
            datetime && extractDate()
        }, 6000)

        void fetchTimeData()

        // cleans up the interval to prevent memory leaks
        return () => {
            clearInterval(EveryMinUpdate)
        }
    }, [])

    useEffect(() => {
        // makes sure the data is fetched before extracting the city name and date
        if(datetime !== undefined) {
            extractDate()
            extractCityName()
        }
    } , [timeData])


        // destructuring the timeData object
        const {
            datetime,
            day_of_week,
            timezone: timezoneLocation,
            utc_offset
        } = timeData


        return (
            <>
                {timezoneLocation &&
                <article className="time-info-tile">
                    <h3 className="city-name">{city}</h3>
                    <div className="info-bar">
                        <p className="utc-bar">UTC: <span className="utc-offset">{utc_offset}</span></p>
                        <p className="date-info">{date}</p>
                    </div>
                    <div className="clock-wrapper">
                        <DigitalClock
                            timezone={timezoneLocation}
                            showSeconds={false}
                        />
                    </div>
                </article>
                }
            </>
        );
    }

    export default TimeInfoTile;