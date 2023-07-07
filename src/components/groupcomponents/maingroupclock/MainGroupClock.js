import React from 'react';
import DigitalClock from "../../DigitalClock/DigitalClock";
import './MainGroupClock.css';


function MainGroupClock() {
    return (
        <article>
            <div className="main-group-clock-container">
                <h1>Group time:</h1>
                <DigitalClock
                    className="main-clock"
                    setToUtc={true}
                    showSeconds={true}
                />
            </div>
        </article>
    );
}

export default MainGroupClock;