import React, {createContext, useState, useEffect} from 'react';
import {auth} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import fetchUserEntry from "../helpers/firebase/fetchUserEntry";


export const UserInfoContext = createContext({
    user: null,
    updateUserInfo: () => {},
})

function UserInfoContextProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)
    const [authState, setAuthState] = useState(
        {
            user: null,
            loading: true,
        }
    )

    // function that updates the context with the latest user info
    async function updateUserInfo() {
        if (await auth.currentUser) {
            setUserInfo( await fetchUserEntry(auth.currentUser))
        } else {
            setUserInfo(null)
        }
    }

    useEffect(() => {
        // listen for auth state changes and checks if user is logged in before first render
        const listen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setAuthState({user: user, loading: false})
                setUserInfo( await fetchUserEntry(user))
            } else {
                setAuthState({user: null, loading: false})
                setUserInfo(null)
            }
        });

        // clean up on unmount
        return () => {
            listen()
        }
    }, [])

    useEffect(() => {
        void updateUserInfo()
    } , [authState.user])

    return (
        <UserInfoContext.Provider value={{user: userInfo, updateUserInfo}}>
            {authState.loading ? <h1>Loading...</h1> : children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;