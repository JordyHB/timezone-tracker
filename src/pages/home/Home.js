import React, {useEffect} from 'react';
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";
import MainLocalClock from "../../components/MainLocalClock/MainLocalClock";
import CitiesTimesContainer from "../../components/CitiesTimesContainer/CitiesTimesContainer";
import {auth} from "../../firebaseConfig";
import fetchUserEntry from "../../helpers/firebase/fetchUserEntry";

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
            <button onClick={ () => fetchUserEntry(auth.currentUser)}>Log User</button>
        </div>

    );
}

export default Home;

