import React, {useState} from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/icons/searchicon.svg'
import "./SearchBar.css"
import TimeZoneSelector from "../../timezoneselector/TimeZoneSelector";
import {useNavigate} from "react-router-dom";


function SearchBar({ className }) {

    const [query, setQuery] = useState('');

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        // checks if the timezone is valid
        if (!Intl.supportedValuesOf('timeZone').includes(query)) {
            alert('Please select a valid timezone')
            return
        } else {
            //sends it to the timezone page removing the '/' from the query
            navigate(`/timezone/${query.replaceAll('/', '%2F')}`)
        }
    }



    return (
        <form className={`search-bar ${className}`} onSubmit={handleSubmit}>
            <TimeZoneSelector
                labelClassName="search-label"
                inputClassName="search-bar-input"
                query={query}
                setQuery={setQuery}
            />
            <button type="submit" className="search-button"><SearchIcon/></button>
        </form>
    );
}

export default SearchBar;