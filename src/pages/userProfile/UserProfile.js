import React, {useContext} from 'react';
import {useParams} from "react-router-dom";
// context
import {UserInfoContext} from "../../context/UserInfoContextProvider";
// components
import Navbar from "../../components/navbar/NavBar";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import FriendList from "../../components/userprofileComponents/friendlist/FriendList";
import GroupList from "../../components/userprofileComponents/grouplist/GroupList";
// styles
import "./UserProfile.css"

function UserProfile() {

    const {user} = useContext(UserInfoContext)
    //handles profiles that are not that of the users
    const {id} = useParams()

    return (

        <>
            <header>
                <Navbar page="profile"/>
            </header>
            <main>
                <h1 className="user-profile-title">{id ? id : user?.username}'s Profile</h1>
                <section className="user-profile-container outer-flex-container">
                    <div className="inner-container">
                        <ProfileInformation
                            id={id ? id : null}
                            showSeconds={true}
                        />
                    </div>
                    <div className="inner-container">
                        <FriendList
                            id={id ? id : null}
                        />
                    </div>
                    <div className="inner-container">
                        <GroupList
                            id={id ? id : null}
                        />
                    </div>
                </section>
            </main>
        </>
    );
}

export default UserProfile;