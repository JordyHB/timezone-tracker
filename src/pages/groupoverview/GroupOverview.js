import React, {useState, useEffect} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";
import MainGroupClock from "../../components/groupcomponents/maingroupclock/MainGroupClock";
import fetchGroupInfo from "../../helpers/firebase/fetchGroupInfo";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";

function GroupOverview() {

    const {id} = useParams()
    const [groupMemberInfo, setGroupMemberInfo] = useState(null)

    async function fetchRequestedGroupInfo() {
        // fetches the group info from the firestore database based on the group id from the url
        setGroupMemberInfo(await fetchGroupInfo(id))
    }

    useEffect(() => {
            void fetchRequestedGroupInfo()
        }
        , [id])

    return (
        <div className="outer-container">
            <Navbar/>
            <MainGroupClock/>
            {/*loads the group members and their info onto the page*/}
            <div className="group-overview-container">
                {groupMemberInfo && groupMemberInfo.map((member) => {
                    return (
                        <ProfileInformation
                            key={member.uid}
                            user={member}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default GroupOverview;