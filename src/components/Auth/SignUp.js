import React, { useState } from 'react';
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";
import {Link} from "react-router-dom";
import mapErrorCodeToMessage from "../../helpers/firebase/mapErrorCodeToMessage";
import createUserEntry from "../../helpers/firebase/createUserEntry";

function SignUp() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const signUp = (e) => {
        // set error to null on submit
        setError(null)
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                void createUserEntry(user)
            })
            .catch((e) => {
                    console.log(e.code)
                    console.log(e.message)
                    setError(mapErrorCodeToMessage(e.code))
                }
            );
    }

    return (
        <section className="auth-container">
            <h1 className="auth-container-title">Register</h1>
            <form className="auth-form" onSubmit={signUp} noValidate>
                <label htmlFor="email" className="auth-labels">Email</label>
                <input
                    className="auth-inputs"
                    type="email"
                    name="email"
                    id="email"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="password" className="auth-labels">Password</label>
                <input
                    className="auth-inputs"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="register-button auth-form-button">Register</button>
                <Link to={'/login'} className="switch-to-opposite-link">Already have an account? Login here.</Link>
            </form>
        </section>
    );
}

export default SignUp;