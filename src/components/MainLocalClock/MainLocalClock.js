import React, {useEffect, useState} from 'react';
import DigitalClock from "../DigitalClock/DigitalClock";
import axios from "axios";
import './MainLocalClock.css'

function MainLocalClock(props) {

    // stores the time data from the API
    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    // loading starts off true to ensure that the data is fetched before the clock is rendered
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)

    async function fetchTimeData() {

        // attempts to fetch the time data from the API based on IP address
        try {
            toggleError(false)
            const { data } = await axios.get('http://worldtimeapi.org/api/ip')
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
            // gets only the location data from the returned object
            const { location } = (await axios.get(`https://api.ipregistry.co/?${IP_REGISTRY_API_KEY}`)).data

            setLocationData(location)

        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            console.error(e)
        }
    }

    useEffect(() => {
        void fetchTimeData()
        void fetchLocationData()
    }, [])

    useEffect(() => {
        console.log(loading)
        // once the data is fetched, loading is set to false
        if (timeData.datetime !== undefined && locationData.city !== undefined) {
            toggleLoading(false)
            }

    }, [timeData, locationData])

    return (
        <>
            <article className="main-clock-container">
                {/*handles giving the user feedback if there is an error or if the data is loading*/}
                {error && <p className="error-message">There was an error fetching the data</p>}
                {loading && <p className="loading-message">fetching local data</p>}
                {!loading && !error &&
                    <>
                        {/*only renders the clock if the data is fetched*/}
                        <h3 className='location-info'>The current time for: <span
                            className="location">{`${locationData.city}, ${ locationData.country.name }`}</span></h3>
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