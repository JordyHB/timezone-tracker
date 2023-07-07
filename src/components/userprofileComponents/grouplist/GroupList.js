import React, { useContext } from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import AddFriendModal from "../friendlist/friendlistcomponents/addfriendmodal/AddFriendModal";

function GroupList() {

    const {groupList} = useContext(UserInfoContext)


    return (
        <article className="friend-list-container">
            <h3 className="friend-list-title">Group List</h3>
            {groupList && console.log(groupList)}
            {groupList && groupList.length === 0 && <p>Group list is empty</p>}
            {groupList && groupList.map((friend) => {
                    return (
                        <div
                            className="friend-preview" key={friend.groupname}>
                            <p>Group name: <span>{friend.groupname}</span></p>
                            <p>Members: <span>{friend.members[0]}</span></p>
                        </div>
                    )
                }
            )}
        </article>
    );
}

export default GroupList;