import React, {createContext, useState, useEffect} from 'react';
import {onSnapshot, doc, collection} from "firebase/firestore";
import {auth, db} from "../firebaseConfig";
import {onAuthStateChanged} from "firebase/auth";
import fetchUserEntry from "../helpers/firebase/fetchUserEntry";
import fetchFriendList from "../helpers/firebase/fetchFriendList";


export const UserInfoContext = createContext({
    user: null,
    friendList: null,
    groups: null,
    isAuth: false,
    setAuthState: () => {}
})

function UserInfoContextProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)
    const [friendList, setFriendList] = useState(null)
    const [authState, setAuthState] = useState(
        {
            user: null,
            isAuth: false,
            loading: true,
            displayNameSet: false
        }
    )


    useEffect(() => {
        // listen for auth state changes and checks if user is logged in before first render
        const unListen = onAuthStateChanged(auth, async (user) => {
            //checks if displayName has been set and stored
            if (user && user.displayName !== null || authState.displayNameSet) {
                setUserInfo(await fetchUserEntry(user))
                setFriendList(await fetchFriendList())
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
    }, [authState.displayNameSet])


    // listen for auth state changes and checks if user is logged in before adding a snapshot listener
    useEffect(() => {

        // function that returns a snapshot listener for the user entry
        function subscribeToUser() {
            if (auth.currentUser) {
                return onSnapshot(doc(db, 'users', auth.currentUser?.displayName), (doc) => {
                    setUserInfo(doc.data())
                });
            } else {
                //returns an empty function if the user is not logged in
                return () => {
                }
            }
        }

        // function that returns a snapshot listener for the friend list
        function subscribeToFriendList() {
            if (auth.currentUser) {
                return onSnapshot(collection(db, 'users', auth.currentUser?.displayName, 'friends'), (collection) => {
                    setFriendList(collection.docs.map(doc => doc.data()))
                });
            } else {
                //returns an empty function if the user is not logged in
                return () => {
                }
            }
        }

        // subscribe to user entry and friend list
        const unsubscribeToUser = subscribeToUser()
        const unsubscribeToFriendList = subscribeToFriendList()


        // clean up on unmount
        return () => {
            unsubscribeToUser()
            unsubscribeToFriendList()
        }
    }, [authState.user])


    return (
        <UserInfoContext.Provider value={
            {
                user: userInfo,
                isAuth: authState.isAuth,
                friendList: friendList,
                setAuthState: setAuthState,
            }
        }>
            {authState.loading ? <h1>Loading...</h1> : children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;