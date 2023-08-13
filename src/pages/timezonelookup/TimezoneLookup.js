import React from 'react';
import {useParams} from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import LookupResultTile from "../../components/timezonelookupcomponents/LookupResultTile";


function TimezoneLookup() {

    const {id} = useParams()

    return (

        <>
            <header>
                <NavBar/>
            </header>
            <main>
                <LookupResultTile
                    timezone={id}
                />
            </main>
        </>
    );
}

export default TimezoneLookup;