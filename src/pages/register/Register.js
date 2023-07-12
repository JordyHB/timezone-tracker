import React from 'react';
//imports for styling
import '../../components/Auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/NavBar/NavBar";
import SignUp from "../../components/Auth/SignUp";

function Register() {

    return (
        <>
            <header>
                <NavBar page="signup"/>
            </header>
            <main>
                <section className="auth-container">
                    <SignUp/>
                </section>
            </main>
        </>
    );
}

export default Register;