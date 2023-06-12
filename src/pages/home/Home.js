import React, {useEffect, useState} from 'react';
import axios from "axios";
import DigitalClock from "../../components/DigitalClock/DigitalClock";
import TimeInfoTile from "../../components/TimeInfoTile/TimeInfoTile";
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";

function Home(props) {


    const [timeData, setTimeData] = useState({})
    const [locationData, setLocationData] = useState({})
    const [shownTimeTiles, setShownTimeTiles] = useState(['Europe/London', 'Asia/Shanghai', 'America/New_York', 'Australia/Sydney'])



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
        <div className="outer-container">
            <NavBar/>
            <main>
                <section className="main-clock-container">
                    <h3>The current time for: <span className="location-info">{`${locationData.city}, ${locationData.country_name}`}</span></h3>
                    <DigitalClock
                        timezone={timeData.timezone}
                        showSeconds={true}
                    />
                    {/*<p>{loading ? <p>fetching local time</p> : localTimeString}</p>*/}
                </section>
                <section className="other-cities-container">
                    {shownTimeTiles.map((timezone, index) => {
                        return (
                            <TimeInfoTile
                                key={index}
                                timezone={timezone}
                            />
                        )
                    }
                    )}
                </section>
            </main>
        </div>
    );
}

export default Home;

