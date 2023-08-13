import React from 'react';
import DigitalClock from "../../digitalclock/DigitalClock";
import './MainGroupClock.css';


function MainGroupClock() {
    return (
        <article className="main-group-clock-tile">
            <h2 className="main-group-clock-title">Group Time:</h2>
            <div className="main-group-clock-face">
                <DigitalClock
                    className="main-group-clock"
                    setToUtc={true}
                    showSeconds={true}
                />
            </div>
        </article>
    );
}

export default MainGroupClock;