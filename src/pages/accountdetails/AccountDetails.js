import React, {useState} from 'react';
// components
import Navbar from "../../components/navbar/NavBar";
// helpers
import TimeZoneSelector from "../../components/timezoneselector/TimeZoneSelector";
import storeExtraUserInfo from "../../helpers/firebase/storeExtraUserInfo";
// styles
import './AccountDetails.css';

function AccountDetails() {


    const [nickname, setNickname] = useState('')
    const [country, setCountry] = useState('')
    const [query, setQuery] = useState('')


    function handleChange(e) {
        if (e.target.name === 'nickname')
            setNickname(e.target.value)
        else if (e.target.name === 'country')
            setCountry(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        // checks if the user has filled out all the fields
        if (nickname === '' || country === '') {
            alert('Please fill out all the fields')
            return
        }

        // checks if the user has selected a valid timezone
        if (!Intl.supportedValuesOf('timeZone').includes(query)) {
            alert('Please select a valid timezone')
            return
        }

        // creates an object with all the user info from the form and hands it to the storeExtraUserInfo function
        const userInfo = {
            nickname: nickname,
            country: country,
            timezone: query
        }

        // gets all the user info from the form and stores it in the database
        void storeExtraUserInfo(userInfo)
    }


    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <section className="extra-info-container">
                    <article className="extra-info-tile">
                        <h1 className="extra-info-title">Thank you for registering</h1>
                        <h2 className="extra-info-subtitle">Please fill out the following information.</h2>
                        <form className="extra-info-form" onSubmit={handleSubmit}>
                            <div className="input-container">
                                <label htmlFor="nickname" className="extra-info-labels">Nickname</label>
                                <input
                                    className="extra-info-inputs"
                                    type="text"
                                    id="nickname"
                                    name="nickname"
                                    placeholder="Nickname"
                                    onChange={handleChange}
                                    value={nickname}
                                />
                            </div>
                            <div className="input-container">
                                <label htmlFor="country" className="extra-info-labels">Country</label>
                                <input
                                    className="extra-info-inputs"
                                    type="text"
                                    id="country"
                                    name="country"
                                    placeholder="Country"
                                    onChange={handleChange}
                                    value={country}
                                />
                            </div>
                            <div className="input-container">
                                <TimeZoneSelector
                                    inputClassName="extra-info-inputs"
                                    labelClassName="extra-info-labels"
                                    query={query}
                                    setQuery={setQuery}
                                    label={'Timezone'}
                                />
                            </div>
                            <button type="submit" className="extra-info-button">Submit</button>
                        </form>
                    </article>
                </section>
            </main>
        </>
    );
}

export default AccountDetails;