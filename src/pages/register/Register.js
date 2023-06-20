import React from 'react';
//imports for styling
import '../../components/Auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/NavBar/NavBar";
import SignUp from "../../components/Auth/SignUp";

function Register() {

    return (
        <div className="outer-container">
            <NavBar/>
            <main>
                <SignUp/>
            </main>
        </div>
    );
}

export default Register;