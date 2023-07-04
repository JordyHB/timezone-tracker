import React, { useContext } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { UserInfoContext } from "../../context/UserInfoContextProvider";
import TimeZoneSelector from "../../components/TimeZoneSelector";

function UserProfile() {

    const {user, updateUserInfo} = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <Navbar/>
            <main>
                <h1>User Profile</h1>
                <span>{user?.email}</span>
                <span>{user?.displayName}</span>
                <span>{user?.country}</span>
                <span>{user?.timezone}</span>
                <button onClick={updateUserInfo}>Log User</button>
                <TimeZoneSelector/>
            </main>
        </div>
    );
}

export default UserProfile;