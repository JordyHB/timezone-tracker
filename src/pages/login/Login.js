import React from 'react';
//imports for styling
import '../../components/Auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/NavBar/NavBar";
import SignIn from "../../components/Auth/SignIn";


function Login() {

    return (
        <div className="outer-container">
            <NavBar page="login"/>
            <main>
                <SignIn/>
            </main>
        </div>
    );
}

export default Login;