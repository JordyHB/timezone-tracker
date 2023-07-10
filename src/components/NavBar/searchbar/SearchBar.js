import React from 'react';
import { ReactComponent as SearchIcon } from '../../../assets/icons/searchicon.svg'
import "./SearchBar.css"


function SearchBar() {
    return (
        <form className="search-bar">
            <input type="text" placeholder="Europe/Amsterdam" className="search-bar-input"/>
            <button type="submit" className="search-button"><SearchIcon/></button>
        </form>
    );
}

export default SearchBar;