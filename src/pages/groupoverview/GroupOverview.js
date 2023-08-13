import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {collection, onSnapshot} from "firebase/firestore";
import {db} from "../../firebaseConfig";
//components
import Navbar from "../../components/navbar/NavBar";
import MainGroupClock from "../../components/groupcomponents/maingroupclock/MainGroupClock";
import AddModalOpenButton from "../../components/addmodalcomponents/addmodalopenbutton/AddModalOpenButton";
import ProfileInformation from "../../components/userprofileComponents/profileInformation/ProfileInformation";
//helpers
import fetchGroupInfo from "../../helpers/firebase/fetchGroupInfo";
//styles
import "./GroupOverview.css"


function GroupOverview() {

    const [groupMemberInfo, setGroupMemberInfo] = useState(null)

    const {id} = useParams()


    async function fetchRequestedGroupInfo() {
        // fetches the group info from the firestore database based on the group id from the url
        setGroupMemberInfo(await fetchGroupInfo(id))
    }


    useEffect(() => {
        // sets up a listener for the group info
        function subscribeToGroupInfo() {
            return onSnapshot(collection(db, 'groups', id, 'memberinfo'), (snapshot) => {
                setGroupMemberInfo(snapshot.docs.map(doc => doc.data()))
            })
        }

        // sets up a listener for the group info
        const unsubscribe = subscribeToGroupInfo()

        // cleans up the listener on unmount
        return () => {
            unsubscribe()
        }
    }, [id])

    useEffect(() => {

        void fetchRequestedGroupInfo()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (

        <>
            <header>
                <Navbar/>
            </header>
            <main>
                <section className="group-overview-container">
                    <article className="group-name-container">
                        <h1 className="group-name-title">{id}:</h1>
                        <AddModalOpenButton variant="add-group-member" groupID={id}/>
                    </article>
                    <MainGroupClock/>
                    {/*loads the group members and their info onto the page*/}
                    {groupMemberInfo && groupMemberInfo.map((member) => {
                        return (<div className="group-member-container" key={member.uid}>
                            <ProfileInformation
                                groupMember={member}
                                showseconds={false}
                            />
                        </div>)
                    })}
                </section>
            </main>
        </>);
}

export default GroupOverview;