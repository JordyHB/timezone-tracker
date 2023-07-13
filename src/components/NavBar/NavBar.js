import React, {useContext} from 'react';
import './NavBar.css'
import {NavLink} from "react-router-dom";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import NavBarButton from "./navbarbutton/NavBarButton";
import SearchBar from "./searchbar/SearchBar";
import {ReactComponent as NavMenuIcon} from '../../assets/icons/navmenuicon.svg'

function NavBar({page}) {

    const {isAuth} = useContext(UserInfoContext)

    return (
        <nav className="nav">
            <div className="site-name-wrapper">
                <NavLink to='/' className="site-name">Timezone Tracker</NavLink>
            </div>
            {/*icon to open the hamburger menu*/}
            <NavMenuIcon
                fill="#F2C300"
                className="nav-menu-toggle"
                // function to open and close the hamburger menu
                onClick={() => {
                    const navLinks = document.querySelector('.nav-links');
                    navLinks.classList.toggle('active')
                }}
            />
            <ul className="nav-links">
                <li><SearchBar/></li>
                {/*displays the home button if the page is not home*/}
                {page !== 'home' && <li><NavLink to="/" className="nav-link">Home</NavLink></li>}
                {/*displays the profile button if the user not on the profile page*/}
                    <li><NavLink to="/profile/myprofile" className="nav-link">My Profile</NavLink></li>
                {/*display the login button if the user is not authenticated*/}
                {isAuth ?
                    <></> : page !== 'signup' &&
                    // if the page is signup or login, don't display the login link
                    page !== 'login' && <li><NavLink to="/login" className="nav-link">Login</NavLink></li>}
                {/*displays the button with sign up or out depending on the auth state*/}
                {isAuth ?
                    <li><NavBarButton text="Sign Out"/></li> : page === "signup" ?
                        // if the page is signup, display the login button
                        <li><NavBarButton text="Login"/></li> : <li><NavBarButton text="Sign Up"/></li>}
            </ul>
        </nav>
    );
}

export default NavBar;