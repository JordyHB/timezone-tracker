import React, { useContext } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { UserInfoContext } from "../../context/UserInfoContextProvider";

function UserProfile() {

    const {user, updateUserInfo} = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <Navbar/>
            <main>
                <h1>User Profile</h1>
                <span>{user?.email}</span>
                <span>{user?.displayName}</span>
                <button onClick={updateUserInfo}>Log User</button>
            </main>
        </div>
    );
}

export default UserProfile;