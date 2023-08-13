import React, {useEffect, useState} from 'react';
import axios from "axios";
// components
import DigitalClock from "../digitalclock/DigitalClock";
import ClockModalOpenButton from "../clocksettingmodalcomponents/clockmodalopenbutton/ClockModalOpenButton";
// helpers
import {fetchCurrentDate} from "../../helpers/worldtimeApi/WorldTimeApiReturns";
// styles
import './HomeInfoTile.css'


function HomeInfoTile() {


    // stores the time data from the API
    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    // loading starts off true to ensure that the data is fetched before the clock is rendered
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)


    async function fetchTimeData(signal) {

        // attempts to fetch the time data from the API based on IP address
        try {
            toggleError(false)
            const {data} = await axios.get(
                'http://worldtimeapi.org/api/ip',
                // signal to abort the fetch if the component is unmounted
                {signal: signal}
            )
            setTimeData(data)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            // prevents the error from being logged if the fetch is canceled
            if (e.code === "ERR_CANCELED") return;
            // logs the error if it is not canceled
            console.error(e)
        }
    }

    // attempts to fetch the location data from the API based on IP address
    async function fetchLocationData(signal) {

        try {
            toggleError(false)
            // gets only the location data from the returned object
            const {location} =
                // intentionally left blank to conserve API key uses while in development
                (await axios.get(
                    `https://api.ipregistry.co/?key=${process.env.REACT_APP_GEOLOCATE_API_KEY}`,
                    // signal to abort the fetch if the component is unmounted
                    // {signal: signal}
                )).data
            setLocationData(location)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            // prevents the error from being logged if the fetch is canceled
            if (e.code === "ERR_CANCELED") return;
            // logs the error if it is not canceled
            console.error(e)
        }
    }


    useEffect(() => {

        // sets up the abort controller to cancel the fetch if the component is unmounted
        const controller = new AbortController()
        const signal = controller.signal

        // fetches the data on page load asynchronously to handle double rendering
        const fetchAndSetupData = async () => {
            try {
                await fetchTimeData(signal);
                await fetchLocationData(signal);
                toggleLoading(false);
            } catch (e) {
                console.error(e);
            }
        };

        // runs the fetch function
        void fetchAndSetupData();

        // aborts the fetch if the component is unmounted
        return () => {
            controller.abort()
        }
    }, [])

    useEffect(() => {

        // once the data is fetched, loading is set to false
        if (timeData.datetime !== undefined && locationData.city !== undefined) {
            toggleLoading(false)
        }

    }, [timeData, locationData, loading])


    return (

        <article className="home-info-tile">
            <div className="clock-face">
                {/*handles giving the user feedback if there is an error or if the data is loading*/}
                {error && <p className="error-message">There was an error fetching the data</p>}
                {!error && <DigitalClock
                    className="main-clock-home"
                    timezone={timeData.timezone}
                    showSeconds={true}
                />}
                <ClockModalOpenButton/>
            </div>
            <div className="info-field-container">
                <p className="info-field">
                    {/*nbsp adds a space to the text*/}
                    Location:&nbsp;
                    <span className="location returned-info">
                        {/*// if there is an error, display the error message, otherwise display the location data or loading*/}
                        {error ?
                            <span className="error-message">There was an error fetching the data</span> :
                            locationData.city ? `${locationData.city}, ${locationData.country.name}` : 'loading'}
                    </span>
                </p>
                <p className="info-field">Timezone:&nbsp;
                    {/*if there is an error, display the error message, otherwise display the timezone data or loading*/}
                    <span className="timezone returned-info">
                        {error ?
                            <span className="error-message">There was an error fetching the data</span> :
                            timeData.datetime ? timeData.timezone : 'loading'}
                    </span>
                </p>
                <p className="info-field">Date:&nbsp;
                    <span className="date returned-info">
                        {/*if there is an error, display the error message, otherwise display the date data or loading*/}
                        {error ?
                            <span className="error-message">There was an error fetching the data</span> :
                            timeData.datetime ? fetchCurrentDate(timeData) : 'loading'}
                    </span>
                </p>
            </div>
        </article>
    )
        ;
}

export default HomeInfoTile;