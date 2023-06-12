import React from 'react';
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";
import MainLocalClock from "../../components/MainLocalClock/MainLocalClock";
import CitiesTimesContainer from "../../components/CitiesTimesContainer/CitiesTimesContainer";

function Home(props) {


    return (
        <div className="outer-container">
            <NavBar/>
            <main>
                <section className="MainLocalClock">
                    <MainLocalClock/>
                </section>
                <section className="other-cities-container">
                    <CitiesTimesContainer/>
                </section>
            </main>
        </div>
    );
}

export default Home;

