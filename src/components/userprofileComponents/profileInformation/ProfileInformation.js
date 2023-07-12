import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import DigitalClock from "../../DigitalClock/DigitalClock";
import './ProfileInformation.css'
import ApiUserInfo from "../../ApiUserInfo";

function ProfileInformation({user}) {

    return (
        <article className="profile-info-tile user-profile-tile">
            <div className="profile-clock-wrapper">
            <DigitalClock
                showSeconds={true}
                timezone={user?.timezone}
                className="profile-clock"
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