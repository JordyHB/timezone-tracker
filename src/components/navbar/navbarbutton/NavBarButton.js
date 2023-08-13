import React from 'react';
import {useNavigate} from "react-router-dom";
import userSignOut from "../../../helpers/firebase/userSignOut";
import "./NavBarButton.css"

function NavBarButton({text}) {

    const navigate = useNavigate()

    // handles the button click based on the text prop
    function handleClick() {

        if (text === "Sign Out") {
            // sign out and redirect to home page
            const redirect = async () => {
                const success = await userSignOut()
                if (success) {
                    navigate("/")
                }
            }
            // call the redirect function
            void redirect()
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