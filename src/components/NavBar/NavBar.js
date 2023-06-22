import React from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";

function NavBar() {
    return (
        <nav className="nav">
            <NavLink to='/' className="site-name">Timezone Tracker</NavLink>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/user'>Profile</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
            </ul>
        </nav>
    );
}

export default NavBar;