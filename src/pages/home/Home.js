import React, {useContext} from 'react';
import {UserPreferencesContext} from "../../context/UserPreferencesContextProvider";
import NavBar from "../../components/navbar/NavBar";
import HomeInfoTile from "../../components/homeinfotile/HomeInfoTile";
import TimeInfoTile from "../../components/timeinfotile/TimeInfoTile";
import './Home.css'


function Home() {

    const {shownTimeTiles} = useContext(UserPreferencesContext)

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

