import React, {createContext, useState, useEffect} from 'react';
import {auth} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import fetchUserEntry from "../helpers/firebase/fetchUserEntry";


export const UserInfoContext = createContext(null)

function UserInfoContextProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)

    useEffect(() => {
        // listen for auth state changes
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserInfo( await fetchUserEntry(user))
            } else {
                setUserInfo(null)
            }
        });

        // clean up on unmount
        return () => {
            listen()
        }
    }, [])

    return (
        <UserInfoContext.Provider value={userInfo}>
            {children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;