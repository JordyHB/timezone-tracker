import React, { useState } from 'react';
import { auth } from '../../firebase'
import { createUserWithEmailAndPassword } from "firebase/auth";

function SignUp(props) {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signUp = (e) => {
        e.preventDefault()
        createUserWithEmailAndPassword(auth, email, password)
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
        <div className="sign-up-container">
            <form className="sign-up-form" onSubmit={signUp}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) =>  setEmail(e.target.value) }/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) =>  setPassword(e.target.value) }/>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;