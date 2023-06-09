import React, {useEffect, useState} from 'react';
import axios from "axios";
import DigitalClock from "../components/DigitalClock/DigitalClock";


function Home(props) {


    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})



    async function fetchTimeData() {
        try {
            const {data} = await axios.get('http://worldtimeapi.org/api/ip')
            setTimeData(data)
        } catch (e) {
            console.error(e)
        }
    }

    async function fetchLocationData() {
        try {
            const {data} = await axios.get('https://geolocation-db.com/json/')
            setLocationData(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {

        void fetchTimeData()
        void fetchLocationData()


    }, [])


    return (
        <>
            <header>
                <h1>Home</h1>
            </header>
            <main>
                <p>Home page content</p>
                <section className="main-clock-container">
                    <h3>{`The current time for ${locationData.city}, ${locationData.country_name}`}</h3>
                    <DigitalClock
                        timezone={timeData.timezone}
                        showSeconds={true}
                    />

                    {/*<p>{loading ? <p>fetching local time</p> : localTimeString}</p>*/}
                    <button type="button" onClick={() => console.log(timeData.timezone)}>time</button>
                </section>
                <DigitalClock
                    timezone={'Europe/London'}
                    showSeconds={true}
                />
                <DigitalClock
                    timezone={'America/Halifax'}
                    showSeconds={true}
                />
                <DigitalClock
                    timezone={'Europe/Helsinki'}
                    showSeconds={true}
                />
            </main>
        </>
    );
}

export default Home;