import React, {useEffect, useState} from 'react';
import DigitalClock from "../DigitalClock/DigitalClock";
import axios from "axios";
import './HomeInfoTile.css'
import {ReactComponent as SettingsIcon} from "../../assets/icons/settingsicon.svg";
import {fetchCurrentDate} from "../../helpers/worldtimeApi/WorldTimeApiReturns";

function HomeInfoTile() {

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
            // gets only the location data from the returned object
            const {location} =
                // intentionally left blank to conserve API key uses while in development
                (await axios.get(`https://api.ipregistry.co/?key=${process.env.REACT_APP_GEOLOCATE_API_KEY}`)).data

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

        <article className="home-info-tile">
            <div className="clock-face">
                <SettingsIcon className="settings-icon"/>
                <DigitalClock
                    className="main-clock-home"
                    timezone={timeData.timezone}
                    showSeconds={true}
                />
            </div>
            <div className="info-field-container">
                <p>
                    <span className="location info-field">
                        {/*// if there is an error, display the error message, otherwise display the location data or loading*/}
                        {error ?
                            {error} : locationData.city ? `${locationData.city}, ${locationData.country.name}` : 'loading'}
                    </span>
                </p>
                <p>
                    {/*if there is an error, display the error message, otherwise display the timezone data or loading*/}
                    <span className="timezone info-field">
                        {error ?
                            {error} : timeData.datetime ? timeData.timezone : 'loading'}
                    </span>
                </p>
                <p>
                    <span className="date info-field">
                        {/*if there is an error, display the error message, otherwise display the date data or loading*/}
                        {error ?
                            {error} : timeData.datetime ? fetchCurrentDate(timeData) : 'loading'}
                    </span>
                </p>
            </div>


        </article>
    )
        ;
}

export default HomeInfoTile;