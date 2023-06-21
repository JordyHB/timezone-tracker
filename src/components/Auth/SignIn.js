import React, {useState} from 'react';
import {auth} from '../../firebase'
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link} from "react-router-dom";
import mapErrorCodeToMessage from "../../helpers/mapErrorCodeToMessage";

function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)

    const signIn = (e) => {
        // set error to null on submit
        setError(null)
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user
                console.log(user)
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
            <h1 className="auth-container-title">Login</h1>
            <form className="auth-form" onSubmit={signIn} noValidate>
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
                <button type="submit" className="login-button auth-form-button">Log In</button>
                <Link to={'/signup'} className="switch-to-opposite-link">Don't have an account? Register here.</Link>
            </form>
        </section>
    );
}

export default SignIn;