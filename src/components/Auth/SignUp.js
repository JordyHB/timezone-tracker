import React, {useContext, useEffect, useState} from 'react';
import {auth} from '../../firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import mapErrorCodeToMessage from "../../helpers/firebase/mapErrorCodeToMessage";
import createUserEntry from "../../helpers/firebase/createUserEntry";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import checkNameAvailability from "../../helpers/firebase/checkNameAvailability";

function SignUp() {

    const [requestedUserName, setRequestedUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [waitingForRedirect, setWaitingForRedirect] = useState(false)

    const navigate = useNavigate()
    const {isAuth, setAuthState} = useContext(UserInfoContext)

    const signUp = async (e) => {
        // set error to null on submit
        setError(null)
        setWaitingForRedirect(false)

        try {
            e.preventDefault()
            // check if username is available it takes the username and indicates it is a username check
            if (await checkNameAvailability(requestedUserName, 'username') === false) {
                setError('Username is already taken')
            } else {

                // create user with email and password
                await createUserWithEmailAndPassword(auth, email, password)

                // if username is available, set the username to the userCredential
                await updateProfile(auth.currentUser, {
                    displayName: requestedUserName
                })
                // set the displayNameSet flag to true in the context
                setAuthState(prevState => ({prevState, displayNameSet: true}))
                const user = auth.currentUser
                // create a new entry in the users collection in the firestore database
                void createUserEntry(user)
                // sets waitingForRedirect to true so that we can redirect once the user creation load is done
                setWaitingForRedirect(true)
            }
        } catch (e) {
            console.log(e.code)
            console.log(e.message)
            setError(mapErrorCodeToMessage(e.code))
        }
    }


    // if waitingForRedirect is true and the context has been filled, redirect to account details page
    useEffect(() => {
        if (waitingForRedirect && isAuth) {
            navigate('/account-details')
        }
    }, [waitingForRedirect, isAuth, navigate])

    return (
        <article className="auth-tile">
            <h1 className="auth-tile-title">Register</h1>
            <form className="auth-form" onSubmit={signUp} noValidate>
                <div className="input-container">
                    <label htmlFor="username" className="auth-labels">Username</label>
                    <input
                        className="auth-inputs"
                        type="text"
                        name="username"
                        id="username"
                        value={requestedUserName}
                        onChange={(e) => setRequestedUserName(e.target.value)}
                    />
                </div>
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
                <button type="submit" className="register-button auth-form-button">Register</button>
                <Link to={'/login'} className="switch-to-opposite-link">Already have an account? Login here.</Link>
            </form>
        </article>
    );
}

export default SignUp;