import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import DigitalClock from "../../DigitalClock/DigitalClock";
import './ProfileInformation.css'
import ApiUserInfo from "../../ApiUserInfo";

function ProfileInformation() {

    const {user} = useContext(UserInfoContext)
    return (
        <article className="profile-info-tile">
            <h1>Profile Information</h1>
            <div className="profile-clock-wrapper">
            <DigitalClock
                showSeconds={true}
                timezone={user?.timezone}
            />
            </div>
            <p>Nickname: <span>{user?.nickname}</span></p>
            <p>Country: <span>{user?.country}</span></p>
            <p>Timezone: <span>{user?.timezone}</span></p>
            <ApiUserInfo
                timezone={user?.timezone}
            />
        </article>
    );
}

export default ProfileInformation;