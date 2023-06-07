import React, {useEffect, useState} from 'react';
import axios from "axios";


function Home(props) {

    const [timeZones, setTimeZones] = useState([])

    async function fetchTimeZones(){
        try {
            const { data } = await axios.get('http://worldtimeapi.org/api/timezone')
            setTimeZones(data)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        void fetchTimeZones()
        console.log(timeZones)
    }, [])

    useEffect(() => {
        console.log(timeZones)
    }, [timeZones])


    return (
        <>
            <header>
                <h1>Home</h1>
            </header>
            <main>
                <p>Home page content</p>
            </main>
        </>
    );
}

export default Home;