import React from 'react';
//imports for styling
import '../../components/auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/navbar/NavBar";
import SignIn from "../../components/auth/SignIn";


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