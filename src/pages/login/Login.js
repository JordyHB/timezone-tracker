import React from 'react';
import NavBar from "../../components/NavBar/NavBar";
import './Login.css'

function Login(props) {

    function handleSubmit(e) {
        e.preventDefault();
        console.log(e.target.username.value);
        console.log(e.target.password.value);
    }

    return (
        <div className="outer-container">
            <NavBar/>
            <main>
                <section className="login-container">
                    <h1 className="login-title">Login</h1>
                    <form onSubmit={(e) => handleSubmit(e)} className="login-form">
                        <label htmlFor="username" className="login-labels">Username:</label>
                        <input type="text" id="username" name="username" className="login-inputs"/>
                        <label htmlFor="password" className="login-labels">Password:</label>
                        <input type="password" id="password" name="password" className="login-inputs"/>
                        <div className="login-buttons-container">
                            <button type="submit" className="login-button login-form-button">Login</button>
                            <button type="button" className="register-button login-form-button">Register</button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    );
}

export default Login;