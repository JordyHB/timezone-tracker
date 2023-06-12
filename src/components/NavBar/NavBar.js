import React from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";

function NavBar(props) {
    return (
        <nav className="nav">
            <NavLink to='/' className="site-name">Timezone Tracker</NavLink>
            <ul>
                <li>
                    <NavLink to='/'>Home</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;