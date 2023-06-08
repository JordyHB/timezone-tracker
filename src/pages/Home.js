import React, {useEffect, useState} from 'react';
import axios from "axios";


function Home(props) {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    const [localTimeString, setLocalTimeString] = useState('')
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    const [hours, setHours] = useState(0)
    const [day, setDay] = useState(0)

    async function fetchTimeData(){
        try {
            const { data } = await axios.get('http://worldtimeapi.org/api/ip')
            setTimeData(data)
        } catch (e) {
            console.error(e)
        }
    }

    async function fetchLocationData() {
        try {
            const { data } = await axios.get('https://geolocation-db.com/json/')
            setLocationData(data)
        } catch (e) {
            console.error(e)
            }
    }

    useEffect(() => {

        void fetchTimeData()
        void fetchLocationData()



    }, [])

    useEffect(() => {
        function convertToLocalTime() {

            const localTime = new Date()
            setLocalTimeString(localTime.toLocaleTimeString("en-GB", {timeZone:timeData.timezone, hour12: false }))
            setDay(localTime.getDay())
            setHours(localTime.getHours())
            setMinutes(localTime.getMinutes())
            setSeconds(localTime.getSeconds())
            console.log(localTimeString)
        }

        setLoading(true)

        timeData.timezone && setInterval(() => {
            convertToLocalTime()
            setLoading(false)
        }, 1000)

    }, [timeData, locationData])

    function printTime() {
        const requestedTime = new Date(localTimeString)
        console.log(requestedTime)
    }

    return (
        <>
            <header>
                <h1>Home</h1>
            </header>
            <main>
                <p>Home page content</p>
                <section className="main-clock-container">
                    <h3>{`The current time for ${locationData.city}, ${locationData.country_name}`}</h3>
                    <p>{`${hours} ${minutes} ${seconds}`}</p>
                    <p>{loading ? <p>fetching local time</p> : localTimeString}</p>
                    <button type="button" onClick={() => console.log(timeData.timezone)}>time</button>
                </section>
            </main>
        </>
    );
}

export default Home;