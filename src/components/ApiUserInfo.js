import React, {useState, useEffect} from 'react';
import axios from "axios";

function ApiUserInfo({timezone}) {

    const [timeData, setTimeData] = useState({})
    const [loading, toggleLoading] = useState(true)
    const [error, toggleError] = useState(false)

    async function fetchTimeData(timezone) {

        // attempts to fetch the time data from the API based on the timezone prop
        try {
            toggleError(false)
            const {data} = await axios.get(`http://worldtimeapi.org/api/timezone/${timezone}`)
            setTimeData(data)
        } catch (e) {
            toggleError(true)
            toggleLoading(false)
            console.error(e)
        }
    }

    function fetchDSTChangeDate() {
        // fetches the date of the next daylight savings time change
        // returns a string with the date in the format of "Month Day"
        if (timeData.dst) {
            //slice is used to remove the milliseconds
            const date = new Date(timeData.dst_until)
            return date.toLocaleString('default', {month: 'long', day: 'numeric'})


        } else {
            const date = new Date(timeData.dst_from)
            return date.toLocaleString('default', {month: 'long', day: 'numeric'})
        }

    }

    useEffect(() => {
        void fetchTimeData(timezone)
    }, [])

    useEffect(() => {
        const test = fetchDSTChangeDate()
        console.log(test)
    }, [timeData])


    return (
        <>
            <div className="api-user-info">
                <p>Daylight savings time: <span>{timeData.dst ? 'Yes' : 'No'}</span></p>
                <p>Daylight savings change date: <span>{fetchDSTChangeDate()}</span></p>
                <p>Timezone abbreviation: <span>{timeData.abbreviation}</span></p>
                <p>Timezone UTC Offset: <span>{timeData.utc_offset}</span></p>

            </div>


        </>
    );
}

export default ApiUserInfo;