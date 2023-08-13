import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
// context
import {UserInfoContext} from "../../context/UserInfoContextProvider";
// components
import DigitalClock from "../digitalclock/DigitalClock";
// helpers
import {
    checkForValidAbbreviation,
    fetchCurrentDate,
    fetchDSTChangeDate,
    fetchTimezoneOffset
} from "../../helpers/worldtimeApi/WorldTimeApiReturns";
// styles
import './LookupResultTile.css'


function LookupResultTile({timezone}) {

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [timeData, setTimeData] = useState(null)

    const {user, isAuth} = useContext(UserInfoContext)


    function extractCityName(timezone) {
        // takes the timezone string and extracts the city name
        const city = timezone.split('/')
        return city[city.length - 1].replace('_', ' ')
    }

    // fetches the requested timezone info on mount and when the id changes
    useEffect(() => {

        async function fetchRequestedTimezoneInfo() {

            // creates a signal to cancel the fetch request if the component unmounts
            const abortController = new AbortController()
            const signal = abortController.signal

            try {
                setLoading(true)
                setError(null)

                // takes the ID and runs it through the API to get the timezone info
                const {data} = await axios.get(
                    `http://worldtimeapi.org/api/timezone/${timezone}`,
                    {signal: signal}
                )
                setTimeData(data)
                setLoading(false)
            } catch (e) {
                // prevents the error from being logged if the fetch is canceled
                if (e.code === "ERR_CANCELED") return;
                // logs the error if it is not canceled
                setError('There was an error fetching API data')
                setLoading(false)
                console.error(e)
            }
        }

        // runs the fetch function
        void fetchRequestedTimezoneInfo()

    }, [timezone])


    return (

        <article className="lookup-result-tile">
            {timeData?.timezone && <h2 className="lookup-tile-title">{extractCityName(timeData.timezone)}</h2>}
            <div className="clock-face">
                {/*handles giving the user feedback if there is an error or if the data is loading*/}
                {error && <p className="error-message">There was an error fetching the data</p>}
                {loading && <p className="loading-message">fetching local data</p>}
                {!loading && !error && timeData.datetime !== undefined &&
                    <DigitalClock
                        className="main-clock-home"
                        timezone={timeData.timezone}
                        datetime={timeData.datetime}
                        showSeconds={true}
                    />}
            </div>
            {/*handles giving the user feedback if there is an error or if the data is loading*/}
            {error && <p className="error-message">There was an error fetching the data</p>}
            {loading && <p className="loading-message">fetching local data</p>}
            {!loading && !error && timeData.datetime !== undefined &&
                <div className="timezone-info-container">
                    <p className="info-p">Timezone: {timeData.timezone}</p>
                    <p className="info-p">UTC Offset: {timeData.utc_offset}</p>
                    {/*shows a different message depending on if the user is logged in or not*/}
                    {isAuth ?
                        <p className="info-p">You are: {fetchTimezoneOffset(timezone, user.timezone)}</p>
                        :
                        <p className="info-p">Your system time is: {fetchTimezoneOffset(timezone)}</p>
                    }
                    <p className="info-p">Date: {fetchCurrentDate(timeData)}</p>
                    <p className="info-p">Abbreviation: {checkForValidAbbreviation(timeData.abbreviation)}</p>
                    <p className="info-p">Daylight Savings: {timeData.dst ? 'Yes' : 'No'}</p>
                    <p className="info-p">DST Change Date: {fetchDSTChangeDate(timeData)}</p>
                </div>}

        </article>


    )
        ;
}

export default LookupResultTile;