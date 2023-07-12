import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../../firebaseConfig'
import {signInWithEmailAndPassword} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import mapErrorCodeToMessage from "../../helpers/firebase/mapErrorCodeToMessage";
import {UserInfoContext} from "../../context/UserInfoContextProvider";

function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [waitingForRedirect, setWaitingForRedirect] = useState(false)

    // flag to check if the user is authenticated and the context has been filled
    const navigate = useNavigate()
    const {isAuth} = useContext(UserInfoContext)

    const signIn = async (e) => {
        // set error to null on submit
        setError(null)
        setWaitingForRedirect(false)

        try {
            e.preventDefault()
            // sign in with email and password
            await signInWithEmailAndPassword(auth, email, password)
            // sets waitingForRedirect to true so that we can redirect once the user creation load is done
            await setWaitingForRedirect(true)
        } catch (e) {
            console.log(e.code)
            console.log(e.message)
            setError(mapErrorCodeToMessage(e.code))
        }
    }

    // if waitingForRedirect is true and the context has been filled, redirect to account details page
    useEffect(() => {
        if (waitingForRedirect && isAuth) {
            navigate('/profile/myprofile')
        }
    }, [waitingForRedirect, isAuth, navigate])

    return (
        <article className="auth-tile">
            <h1 className="auth-tile-title">Login</h1>
            <form className="auth-form" onSubmit={signIn} noValidate>
                <div className="input-container">
                    <label htmlFor="email" className="auth-labels">Email</label>
                    <input
                        className="auth-inputs"
                        type="email"
                        name="email"
                        id="email"
                        value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-container">
                    <label htmlFor="password" className="auth-labels">Password</label>
                    <input
                        className="auth-inputs"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="login-button auth-form-button">Log In</button>
                <Link to={'/signup'} className="switch-to-opposite-link">Don't have an account? Register here.</Link>
            </form>
        </article>
    );
}

export default SignIn;