import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
//context
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
//components
import AddModalOpenButton from "../../addmodalcomponents/addmodalopenbutton/AddModalOpenButton";
//helpers
import fetchGroupList from "../../../helpers/firebase/fetchGroupList";
//styles
import "./GroupList.css"


function GroupList({id}) {

    const [groupList, setGroupList] = useState(null)

    const userContext = useContext(UserInfoContext)

    const navigate = useNavigate()


    useEffect(() => {

        async function fetchRequestedUserGroupList() {
            setGroupList(await fetchGroupList(id))
        }

        //fetches the group list from a requested user if not the auth user
        if (id && id !== userContext?.user?.username && id !== 'myprofile') {
            void fetchRequestedUserGroupList(id)
        } else {
            // takes the group list  from the context if the user is the auth user
            setGroupList(userContext.groupList)
        }

        // cleans up the old data in case of profile hopping
        return () => {
            setGroupList(null)
        }
    }, [id, userContext])


    return (

        <article className="group-list-tile user-profile-tile">
            <h3 className="friend-group-title">Group List:</h3>
            {/*only renders the button if on your own profile*/}
            {!id && <AddModalOpenButton variant="create-group"/>}
            {groupList && groupList.length === 0 && <p>Group list is empty</p>}
            {groupList && groupList.map((group) => {
                    return (
                        <div
                            className="group-preview friend-group-body-text"
                            key={group.groupname}
                            onClick={() => {
                                navigate(`/groups/${group.groupname}`)
                            }}
                        >
                            <p className="group-name"><span>{group.groupname}</span></p>
                            <p>Member count: <span>{group.members.length}</span></p>
                        </div>
                    )
                }
            )}
        </article>
    );
}

export default GroupList;