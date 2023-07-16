import React from 'react';
import {useParams} from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";
import LookupResultTile from "../../components/timezonelookupcomponents/LookupResultTile";

function TimezoneLookup(props) {

    const { id } = useParams()

    return (
        <>
          <header>
              <NavBar/>
          </header>
            <main>
              <LookupResultTile
                timezone="Europe/London"
              />
            </main>
        </>
    );
}

export default TimezoneLookup;