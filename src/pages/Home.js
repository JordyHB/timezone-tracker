import React, {useEffect, useState} from 'react';
import axios from "axios";


function Home(props) {

    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    const [localTime, setLocalTime] = useState('')

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
        console.log(timeData)
        console.log(locationData)
        setLocalTime(Date(timeData.datetime))
    }
    , [timeData, locationData])

    return (
        <>
            <header>
                <h1>Home</h1>
            </header>
            <main>
                <p>Home page content</p>
                <section className="main-clock-container">
                    <h3>{`The current time for ${locationData.city}, ${locationData.country_name}`}</h3>
                    <p>{localTime}</p>
                </section>
            </main>
        </>
    );
}

export default Home;