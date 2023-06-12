import React, {useEffect, useState} from 'react';
import DigitalClock from "../DigitalClock/DigitalClock";
import axios from "axios";
import './MainLocalClock.css'

function MainLocalClock(props) {

    // stores the time data from the API
    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    const [loading, toggleLoading] = useState(false)
    const [error, toggleError] = useState(false)

    async function fetchTimeData() {

        // attempts to fetch the time data from the API based on IP address
        try {
            toggleError(false)
            const {data} = await axios.get('http://worldtimeapi.org/api/ip')
            setTimeData(data)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            console.error(e)
        }
    }

    // attempts to fetch the location data from the API based on IP address
    async function fetchLocationData() {
        try {
            toggleError(false)
            const {data} = await axios.get('https://geolocation-db.com/json/')
            setLocationData(data)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            console.error(e)
        }
    }

    useEffect(() => {
        toggleLoading(true)
        void fetchTimeData()
        void fetchLocationData()
    }, [])

    useEffect(() => {
        // once the data is fetched, loading is set to false
        if(timeData.datetime !== undefined) {
            toggleLoading(false)
        }
    }, [timeData])

    return (
        <>
            <article className="main-clock-container">
                {/*handles giving the user feedback if there is an error or if the data is loading*/}
                {error && <p className="error-message">There was an error fetching the data</p>}
                {loading && <p className="loading-message">fetching local data</p>}
                {!loading && !error &&
                    <>
                        {/*only renders the clock if the data is fetched*/}
                        <h3 className='location-info'>The current time for: <span className="location">{`${locationData.city}, ${locationData.country_name}`}</span></h3>
                        <DigitalClock
                            className="main-clock"
                            timezone={timeData.timezone}
                            showSeconds={true}
                        />
                    </>
                }
            </article>
        </>
    );
}

export default MainLocalClock;