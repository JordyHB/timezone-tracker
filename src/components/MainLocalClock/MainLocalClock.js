// import React, {useEffect, useState} from 'react';
// import DigitalClock from "../DigitalClock/DigitalClock";
// import axios from "axios";
// import './MainLocalClock.css'
//
// function MainLocalClock() {
//
//
//
//     return (
//         <>
//             <article className="main-clock-container">
//                 {/*handles giving the user feedback if there is an error or if the data is loading*/}
//                 {error && <p className="error-message">There was an error fetching the data</p>}
//                 {loading && <p className="loading-message">fetching local data</p>}
//                 {!loading && !error &&
//                     <>
//                         {/*only renders the clock if the data is fetched*/}
//                         <h3 className='location-info'>The current time for: <span
//                             className="location">{`${locationData.city}, ${ locationData.country.name }`}</span></h3>
//                         <DigitalClock
//
//                         />
//                     </>
//                 }
//             </article>
//         </>
//     );
// }

// export default MainLocalClock;