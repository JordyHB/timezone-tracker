import React, { useState } from 'react';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

function SignIn(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            }
        );
    }

    return (
        <div className="sign-in-container">
            <form className="sign-in-form" onSubmit={signIn}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) =>  setEmail(e.target.value) }/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) =>  setPassword(e.target.value) }/>
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;