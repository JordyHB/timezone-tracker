import React, {useEffect, useState} from 'react';
import {auth} from '../../firebaseConfig'
import {onAuthStateChanged, signOut} from "firebase/auth";


function AuthDetails(props) {

    const [authUser, setAuthUser] = useState(null)

    useEffect(() => {
        // listen for auth state changes
        const listen = onAuthStateChanged(auth, (user) => {
                if (user) {
                    setAuthUser(user)
                } else {
                    setAuthUser(null)
                }
            }
        );

        // clean up on unmount
        return () => {
            listen()
        }
    }, [])

    const userSignOut = () => {
        // sign out
        signOut(auth).then(() => {
            console.log('signed out')
        }).catch((error) => {
                console.log(error)
            }
        );
    }

    return (
        <div>{authUser ? <><button type="button" onClick={userSignOut}>sign out</button><p>signed in</p></> : <p>signed out</p>}</div>
    );
}

export default AuthDetails;