import React, {useState, useEffect, useContext} from 'react';
import {auth} from '../../firebaseConfig'
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {Link, useNavigate} from "react-router-dom";
import mapErrorCodeToMessage from "../../helpers/firebase/mapErrorCodeToMessage";
import createUserEntry from "../../helpers/firebase/createUserEntry";
import {UserInfoContext} from "../../context/UserInfoContextProvider";
import checkUsernameAvailability from "../../helpers/firebase/checkUsernameAvailability";

function SignUp() {

    const [userName, setUserName] = useState('')
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
            // create user with email and password
            await createUserWithEmailAndPassword(auth, email, password)
            // check if username is available
            if (await checkUsernameAvailability(userName) === false) {
                setError('Username is already taken')
            } else {
                // if username is available, set the username to the userCredential
                await updateProfile(auth.currentUser, {
                    displayName: userName
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
        <section className="auth-container">
            <h1 className="auth-container-title">Register</h1>
            <form className="auth-form" onSubmit={signUp} noValidate>
                <label htmlFor="username" className="auth-labels">Username</label>
                <input
                    className="auth-inputs"
                    type="text"
                    name="username"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
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