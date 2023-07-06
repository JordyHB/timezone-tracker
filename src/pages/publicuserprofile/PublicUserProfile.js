import React from 'react';
import Navbar from "../../components/NavBar/NavBar";
import PublicProfileInformation from "../../components/publicprofilecomponents/publicprofileinformation/PublicProfileInformation";
import {useParams} from "react-router-dom";
import PublicFriendList from "../../components/publicprofilecomponents/publicfriendlist/PublicFriendList";

function PublicUserProfile() {

    const { id } = useParams()

    return (
        <div className="outer-container">
            <Navbar/>
            <main className="user-profile-main">
                <PublicProfileInformation
                    username={id}
                />
                <PublicFriendList
                    username={id}
                />
            </main>
        </div>
    );
}

export default PublicUserProfile;