import React, { useContext } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { UserInfoContext } from "../../context/UserInfoContextProvider";

function UserProfile() {

    const user = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <Navbar/>
            <main>
                <h1>User Profile</h1>
                <span>{user?.email}</span>
                <button onClick={() => console.log(user)}>Log User</button>
            </main>
        </div>
    );
}

export default UserProfile;