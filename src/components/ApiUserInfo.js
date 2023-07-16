import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {
    fetchDSTChangeDate,
    fetchCurrentDate,
    checkForValidAbbreviation, fetchTimezoneOffset
} from "../helpers/worldtimeApi/WorldTimeApiReturns";
import {UserInfoContext} from "../context/UserInfoContextProvider";


function ApiUserInfo({timezone, notOwnInfo}) {

    const [timeData, setTimeData] = useState({})
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)

    const {user} = useContext(UserInfoContext)

    async function fetchTimeData(timezone) {

        // attempts to fetch the time data from the API based on the timezone prop
        try {
            toggleError(false)
            const {data} = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`)
            setTimeData(data)
            toggleLoading(false)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            console.error(e)
        }
    }


    useEffect(() => {
        void fetchTimeData(timezone)
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
                            <p className="info-p">You Are: <span>{fetchTimezoneOffset(timeData.timezone, user.timezone)}</span></p>}
                        <p className="info-p">Date: <span>{fetchCurrentDate(timeData)}</span></p>
                        <p className="info-p">Daylight Savings Time: <span>{timeData.dst ? 'Yes' : 'No'}</span></p>
                        <p className="info-p">DST change date: <span>{fetchDSTChangeDate(timeData)}</span></p>
                        <p className="info-p">Timezone abbreviation: <span>{checkForValidAbbreviation(timeData.abbreviation)}</span></p>
                        <p className="info-p">UTC Offset: <span>{timeData.utc_offset}</span></p>
                    </>
                }

            </div>


        </>
    );
}

export default ApiUserInfo;