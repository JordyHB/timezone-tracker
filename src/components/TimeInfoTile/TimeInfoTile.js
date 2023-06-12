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
        setCity(timezoneLocation.split('/')[1])
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
                const {data} = await axios.get('http://worldtimeapi.org/api/timezone/Australia/Brisbane')
                setTimeData(data)
            } catch (e) {
                console.error(e)
            }
        }

        // checks every minute to see if the date has changed
        const EveryMinUpdate = setInterval(() => {
            console.log('checking for date change')
            datetime && extractDate()
        }, 6000)

        void fetchTimeData()

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


        const {
            abbreviation,
            datetime,
            day_of_week,
            raw_offset,
            timezone: timezoneLocation,
            utc_datetime,
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