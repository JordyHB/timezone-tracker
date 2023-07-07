import React from 'react';
import Navbar from "../../components/NavBar/NavBar";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import FriendList from "../../components/userprofileComponents/friendlist/FriendList";
import "./UserProfile.css"
import GroupList from "../../components/userprofileComponents/grouplist/GroupList";

function UserProfile() {

    return (
        <div className="outer-container">
            <Navbar/>
            <main className="user-profile-main">
                <ProfileInformation/>
                <FriendList/>
                <GroupList/>
            </main>
        </div>
    );
}

export default UserProfile;