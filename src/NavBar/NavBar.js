import React from 'react';
import './NavBar.css'

function NavBar(props) {
    return (
        <nav className="nav">
            <a href="/" className="site-name">Timezone Tracker</a>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;