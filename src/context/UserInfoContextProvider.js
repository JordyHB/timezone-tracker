import React, {createContext, useEffect, useState} from 'react';
import {collection, doc, onSnapshot} from "firebase/firestore";
import {onAuthStateChanged} from "firebase/auth";
import {auth, db} from "../firebaseConfig";
//helpers
import fetchUserEntry from "../helpers/firebase/fetchUserEntry";
import fetchFriendList from "../helpers/firebase/fetchFriendList";
import fetchGroupList from "../helpers/firebase/fetchGroupList";


export const UserInfoContext = createContext({
    user: null,
    friendList: null,
    groupList: null,
    isAuth: false,
    setAuthState: () => {
    }
})


function UserInfoContextProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)
    const [friendList, setFriendList] = useState(null)
    const [groupList, setGroupList] = useState(null)
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
            if (user && (user.displayName !== null || authState.displayNameSet)) {
                setUserInfo(await fetchUserEntry(user.displayName))
                setFriendList(await fetchFriendList(user.displayName))
                setGroupList(await fetchGroupList(user.displayName))
                setAuthState({user: user, isAuth: true, loading: false})

            } else {
                setAuthState({user: null, isAuth: false, loading: false})
                setUserInfo(null)
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

        // function that returns a snapshot listener for the group list
        function subscribeToGroupList() {
            if (auth.currentUser) {
                return onSnapshot(collection(db, 'users', auth.currentUser?.displayName, 'groups'), (collection) => {
                    setGroupList(collection.docs.map(doc => doc.data()))
                });
            } else {
                //returns an empty function if the user is not logged in
                return () => {
                }
            }
        }

        // subscribe to user entry, friend list and group list
        const unsubscribeToUser = subscribeToUser()
        const unsubscribeToFriendList = subscribeToFriendList()
        const unsubscribeToGroupList = subscribeToGroupList()

        // clean up on unmount
        return () => {
            unsubscribeToUser()
            unsubscribeToFriendList()
            unsubscribeToGroupList()
        }
    }, [authState.user])


    return (

        <UserInfoContext.Provider value={
            {
                user: userInfo,
                isAuth: authState.isAuth,
                friendList: friendList,
                groupList: groupList,
                setAuthState: setAuthState,
            }
        }>
            {authState.loading ? <h1>Loading...</h1> : children}
        </UserInfoContext.Provider>
    );
}

export default UserInfoContextProvider;