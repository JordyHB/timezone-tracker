import React, {useContext} from 'react';
import './NavBar.css'
import { NavLink } from "react-router-dom";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import userSignOut from "../../helpers/firebase/userSignOut";

function NavBar() {

    const {isAuth} = useContext(UserInfoContext)

    return (
        <nav className="nav">
            <NavLink to='/' className="site-name">Timezone Tracker</NavLink>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/profile'>Profile</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/signup'>Sign Up</NavLink></li>
                {isAuth && <li><button onClick={userSignOut}>Sign out</button></li>}
            </ul>
        </nav>
    );
}

export default NavBar;