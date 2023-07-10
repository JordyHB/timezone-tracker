import React from 'react';
import "./NavBarButton.css"
import userSignOut from "../../../helpers/firebase/userSignOut";
import {useNavigate} from "react-router-dom";

function NavBarButton({text}) {

    const navigate = useNavigate()

    // handles the button click based on the text prop
    function handleClick() {
        if (text === "Sign Out") {
            void userSignOut()
        }
        if (text === "Login") {
            navigate("/login")
        }
        if (text === "Sign Up") {
            navigate("/signup")
        }
    }

    return (
        <button className="nav-bar-button" onClick={handleClick}>
            {text}
        </button>
    );
}

export default NavBarButton;