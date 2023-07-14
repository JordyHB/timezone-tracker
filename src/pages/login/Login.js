import React from 'react';
//imports for styling
import '../../components/Auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/NavBar/NavBar";
import SignIn from "../../components/Auth/SignIn";


function Login() {

    return (
        <>
            <header>
                <NavBar page="login"/>
            </header>
            <main>
                <section className="auth-container">
                    <SignIn/>
                </section>
            </main>
        </>
    );
}

export default Login;