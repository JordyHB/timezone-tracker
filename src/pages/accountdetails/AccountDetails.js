import React, {useContext, useState} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { UserInfoContext } from "../../context/UserInfoContextProvider";
import './AccountDetails.css';
import storeExtraUserInfo from "../../helpers/firebase/storeExtraUserInfo";
import TimeZoneSelector from "../../components/TimeZoneSelector";

function AccountDetails() {

    const [displayName, setDisplayName] = useState('')
    const [country, setCountry] = useState('')

    function handleChange(e) {
        if (e.target.name === 'nickname')
            setDisplayName(e.target.value)
        else if (e.target.name === 'country')
            setCountry(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        const userInfo = {
            displayName: displayName,
            country: country,
            timezone: document.getElementById('timezone').value
        }

        // gets all the user info from the form and stores it in the database
        void storeExtraUserInfo(userInfo)
    }

    return (
        <div className="outer-container">
            <Navbar/>
            <main>
                <article className="form-container">
                    <h1 className="extra-info-title">Thank you for registering</h1>
                    <h2 className="extra-info-subtitle">Please fill out the following information.</h2>
                    <form className="extra-info-form" onSubmit={handleSubmit}>
                        <label htmlFor="nickname" className="extra-info-labels">Nickname:</label>
                        <input
                            className="extra-info-inputs"
                            type="text"
                            id="nickname"
                            name="nickname"
                            placeholder="Nickname"
                            onChange={handleChange}
                            value={displayName}
                        />
                        <label htmlFor="country" className="extra-info-labels">Country:</label>
                        <input
                            className="extra-info-inputs"
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Country"
                            onChange={handleChange}
                            value={country}
                        />
                        <TimeZoneSelector
                            inputClassName="extra-info-inputs"
                            labelClassName="extra-info-labels"
                        />
                        <button type="submit" className="extra-info-button">Submit</button>
                    </form>
                </article>
            </main>
        </div>
    );
}

export default AccountDetails;