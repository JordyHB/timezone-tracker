import React, {createContext, useState, useEffect} from 'react';
import {onSnapshot, doc} from "firebase/firestore";
import {auth, db} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import fetchUserEntry from "../helpers/firebase/fetchUserEntry";


export const UserInfoContext = createContext({
    user: null,
    friendList: null,
    groups: null,
    isAuth: false,
})

function UserInfoContextProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)
    const [authState, setAuthState] = useState(
        {
            user: null,
            isAuth: false,
            loading: true,
        }
    )


    useEffect(() => {
        // listen for auth state changes and checks if user is logged in before first render
        const unListen = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserInfo(await fetchUserEntry(user))
                setAuthState({user: user, isAuth: true, loading: false})
            } else {
                setAuthState({user: null, isAuth: false, loading: false})
                setUserInfo(null)
                console.log('user is not logged in')
            }
        });


        // clean up on unmount
        return () => {
            unListen()
        }
    }, [])


    // listen for auth state changes and checks if user is logged in before adding a snapshot listener
    useEffect(() => {

        // function that returns a snapshot listener for the user entry
        function subscribeToUser() {
            if (auth.currentUser) {
                return onSnapshot(doc(db, 'users', auth.currentUser?.uid), (doc) => {
                    setUserInfo(doc.data())
                });
            } else {
                //returns an empty function if the user is not logged in
                return () => {}
            }
        }

        // subscribe to user entry
        const unsubscribe = subscribeToUser()

        // clean up on unmount
        return () => {
            unsubscribe()
        }
    }, [authState.user])


    return (
        <UserInfoContext.Provider value={{
            user: userInfo,
            isAuth: authState.isAuth,
        }}>
            {authState.loading ? <h1>Loading...</h1> : children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;