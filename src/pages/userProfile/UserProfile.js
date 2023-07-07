import React, {useContext} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import FriendList from "../../components/userprofileComponents/friendlist/FriendList";
import "./UserProfile.css"
import GroupList from "../../components/userprofileComponents/grouplist/GroupList";
import createGroup from "../../helpers/firebase/createGroup";
import {UserInfoContext} from "../../context/UserInfoContextProvider";

function UserProfile() {

    const {user} = useContext(UserInfoContext)

    return (
        <div className="outer-container">
            <Navbar/>
            <main className="user-profile-main">
                <ProfileInformation
                    user={user}
                />
                <FriendList/>
                <GroupList/>
                <button className="add-group-btn" onClick={() => {void createGroup(user, 'porki')}}>Add Group</button>
            </main>
        </div>
    );
}

export default UserProfile;