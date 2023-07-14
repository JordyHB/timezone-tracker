import React, {useContext, useState} from 'react';
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import HomeInfoTile from "../../components/homeinfotile/HomeInfoTile";
import TimeInfoTile from "../../components/TimeInfoTile/TimeInfoTile";

function Home() {

    const {user} = useContext(UserInfoContext)
    // state that stores the timezones to be displayed
    const [shownTimeTiles, setShownTimeTiles] = useState(['Europe/London', 'Asia/Shanghai', 'America/New_York', 'Australia/Sydney', 'America/Vancouver', 'Europe/Moscow'])

    return (
        <>
            <header>
                <NavBar page="home"/>
            </header>
            <main>
                {/*contains the main clock and the other cities clocks*/}
                <section className="grid-container">
                    <HomeInfoTile/>
                    <TimeInfoTile timezone={shownTimeTiles[0]}/>
                    <TimeInfoTile timezone={shownTimeTiles[1]}/>
                    <TimeInfoTile timezone={shownTimeTiles[2]}/>
                    <TimeInfoTile timezone={shownTimeTiles[3]}/>
                    <TimeInfoTile timezone={shownTimeTiles[4]}/>
                    <TimeInfoTile timezone={shownTimeTiles[5]}/>
                </section>
            </main>
        </>

    );
}

export default Home;

