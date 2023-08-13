import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import {
    checkForValidAbbreviation,
    fetchCurrentDate,
    fetchDSTChangeDate,
    fetchTimezoneOffset
} from "../../helpers/worldtimeApi/WorldTimeApiReturns";


function ApiUserInfo({timezone, notOwnInfo}) {

    const [timeData, setTimeData] = useState({})
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)

    const {user} = useContext(UserInfoContext)

    async function fetchTimeData(timezone, signal) {

        // attempts to fetch the time data from the API based on the timezone prop
        try {
            toggleError(false)
            const {data} = await axios.get(
                `http://worldtimeapi.org/api/timezone/${timezone}`,
                {signal: signal}
            )
            setTimeData(data)
            toggleLoading(false)
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

        void fetchTimeData(timezone, signal)
    }, [timezone])


    return (

        <>
            <div className="api-user-info">
                {loading && <p>Loading...</p>}
                {error && <p className="error-message">There was an error fetching API data</p>}
                {!loading && !error &&
                    <>
                        {/*only renders if the component is being used to display someone else's info*/}
                        {notOwnInfo &&
                            <p className="info-p">You
                                Are: <span>{fetchTimezoneOffset(timeData.timezone, user.timezone)}</span></p>}
                        <p className="info-p">Date: <span>{fetchCurrentDate(timeData)}</span></p>
                        <p className="info-p">Daylight Savings Time: <span>{timeData.dst ? 'Yes' : 'No'}</span></p>
                        <p className="info-p">DST change date: <span>{fetchDSTChangeDate(timeData)}</span></p>
                        <p className="info-p">Timezone
                            abbreviation: <span>{checkForValidAbbreviation(timeData.abbreviation)}</span></p>
                        <p className="info-p">UTC Offset: <span>{timeData.utc_offset}</span></p>
                    </>
                }
            </div>
        </>
    );
}

export default ApiUserInfo;