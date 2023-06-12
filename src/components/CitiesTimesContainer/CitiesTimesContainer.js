import React, {useState} from 'react';
import TimeInfoTile from "../TimeInfoTile/TimeInfoTile";
import './CitiesTimesContainer.css'

function CitiesTimesContainer(props) {

    // state that stores the timezones to be displayed
    const [shownTimeTiles, setShownTimeTiles] = useState(['Europe/London', 'Asia/Shanghai', 'America/New_York', 'Australia/Sydney'])

    return (
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
    );
}

export default CitiesTimesContainer;