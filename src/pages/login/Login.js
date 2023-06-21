import React from 'react';
//imports for styling
import '../../components/Auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/NavBar/NavBar";
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
import AuthDetails from "../../components/Auth/AuthDetails";

function Login() {

    return (
        <div className="outer-container">
            <NavBar/>
            <main>
                <SignIn/>
                <AuthDetails/>
            </main>
        </div>
    );
}

export default Login;