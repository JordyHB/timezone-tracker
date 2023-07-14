import React, {useEffect, useState} from 'react';
import Navbar from "../../components/NavBar/NavBar";
import {useParams} from "react-router-dom";
import MainGroupClock from "../../components/groupcomponents/maingroupclock/MainGroupClock";
import fetchGroupInfo from "../../helpers/firebase/fetchGroupInfo";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
import "./GroupOverview.css"
import AddButton from "../../components/addmodalcomponents/addbutton/AddButton";

function GroupOverview() {

    const {id} = useParams()
    const [groupMemberInfo, setGroupMemberInfo] = useState(null)

    async function fetchRequestedGroupInfo() {
        // fetches the group info from the firestore database based on the group id from the url
        setGroupMemberInfo(await fetchGroupInfo(id))
    }

    useEffect(() => {
        void fetchRequestedGroupInfo()
    }, [id])

    return (<>
        <header>
            <Navbar/>
        </header>
        <main>
            <section className="group-overview-container">
                <article className="group-name-container">
                    <h1 className="group-name-title">{id}:</h1>
                    <AddButton variant="add-group-member" groupID={id}/>
                </article>
                <MainGroupClock/>
                {/*loads the group members and their info onto the page*/}
                {groupMemberInfo && groupMemberInfo.map((member) => {
                    return (<div className="group-member-container">
                        <ProfileInformation
                            key={member.uid}
                            user={member}
                            showseconds={false}
                        />
                    </div>)
                })}
            </section>
        </main>
    </>);
}

export default GroupOverview;