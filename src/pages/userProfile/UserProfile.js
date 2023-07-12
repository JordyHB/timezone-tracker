import React, {useContext} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import FriendList from "../../components/userprofileComponents/friendlist/FriendList";
import "./UserProfile.css"
import GroupList from "../../components/userprofileComponents/grouplist/GroupList";
import {UserInfoContext} from "../../context/UserInfoContextProvider";

function UserProfile() {

    const {user} = useContext(UserInfoContext)

    return (
        <>
            <header>
                <Navbar page="profile"/>
            </header>
            <main>
                <h1 className="user-profile-title">{user?.username}'s Profile</h1>
                <section className="user-profile-container outer-flex-container">
                    <div className="inner-container">
                        <ProfileInformation
                            user={user}
                        />
                    </div>
                    <div className="inner-container">
                        <FriendList/>
                    </div>
                    <div className="inner-container">
                        <GroupList/>
                    </div>
                </section>
            </main>
        </>
    );
}

export default UserProfile;