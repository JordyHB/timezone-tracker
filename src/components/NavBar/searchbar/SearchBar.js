import React from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/icons/searchicon.svg'
import "./SearchBar.css"


function SearchBar({ className }) {
    return (
        <form className={`search-bar ${className}`}>
            <input type="text" placeholder="Europe/Amsterdam" className="search-bar-input"/>
            <button type="submit" className="search-button"><SearchIcon/></button>
        </form>
    );
}

export default SearchBar;