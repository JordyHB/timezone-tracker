import React, {useContext, useEffect} from 'react';
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";
import MainLocalClock from "../../components/MainLocalClock/MainLocalClock";
import CitiesTimesContainer from "../../components/CitiesTimesContainer/CitiesTimesContainer";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import HomeInfoTile from "../../components/homeinfotile/HomeInfoTile";

function Home() {

    const {user} = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <NavBar page="home"/>
            <main>
                {/*contains the main clock and the other cities clocks*/}
                <section className="grid-container">
                    <HomeInfoTile/>
                </section>
            </main>
        </div>

    );
}

export default Home;

