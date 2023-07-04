import React, {useContext, useEffect} from 'react';
import './Home.css'
import NavBar from "../../components/NavBar/NavBar";
import MainLocalClock from "../../components/MainLocalClock/MainLocalClock";
import CitiesTimesContainer from "../../components/CitiesTimesContainer/CitiesTimesContainer";
import {auth} from "../../firebaseConfig";
import fetchUserEntry from "../../helpers/firebase/fetchUserEntry";
import {UserInfoContext} from "../../context/UserInfoContextProvider";

function Home(props) {

    const {user} = useContext(UserInfoContext)

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
            <button onClick={ () => console.log(user)}>Log User</button>
        </div>

    );
}

export default Home;

