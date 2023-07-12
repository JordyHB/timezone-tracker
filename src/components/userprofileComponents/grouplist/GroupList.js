import React, { useContext } from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import "./GroupList.css"
import AddButton from "../../addbutton/AddButton";

function GroupList() {

    const {groupList} = useContext(UserInfoContext)


    return (
        <article className="group-list-tile user-profile-tile">
            <h3 className="friend-group-title">Group List:</h3>
            <AddButton variant="add-group"/>
            {groupList && groupList.length === 0 && <p>Group list is empty</p>}
            {groupList && groupList.map((group) => {
                    return (
                        <div
                            className="group-preview friend-group-body-text" key={group.groupname}>
                            <p className="group-name"><span>{group.groupname}</span></p>
                            <p>Member count: <span>{group.members[0]}</span></p>
                        </div>
                    )
                }
            )}
        </article>
    );
}

export default GroupList;