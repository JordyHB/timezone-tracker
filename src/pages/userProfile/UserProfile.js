import React, { useContext } from 'react';
import Navbar from "../../components/NavBar/NavBar";
import { UserInfoContext } from "../../context/UserInfoContextProvider";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import FriendList from "../../components/userprofileComponents/friendlist/FriendList";
import "./UserProfile.css"

function UserProfile() {

    const {user, updateUserInfo} = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <Navbar/>
            <main>
                <ProfileInformation/>
                <FriendList/>
            </main>
        </div>
    );
}

export default UserProfile;