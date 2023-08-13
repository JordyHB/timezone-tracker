import React from 'react';
//imports for styling
import '../../components/auth/AuthContainer.css'
//imports for components
import NavBar from "../../components/navbar/NavBar";
import SignUp from "../../components/auth/SignUp";

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