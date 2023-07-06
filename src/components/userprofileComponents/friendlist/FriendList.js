import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import AddFriendModal from "./friendlistcomponents/addfriendmodal/AddFriendModal";
import "./FriendList.css"

function FriendList() {

    const {friendList} = useContext(UserInfoContext)

    return (
        <div className="friend-list-container">
            <h3 className="friend-list-title">Friends List</h3>
            <AddFriendModal/>
            {friendList && console.log(friendList)}
            {friendList && friendList.length === 0 && <p>Friend list is empty</p>}
            {friendList && friendList.map((friend) => {
                    return (
                        <div className="friend-preview" key={friend.uid}>
                            <p>Nick: <span>{friend.nickname}</span></p>
                            <p>Time zone: <span>{friend.timezone}</span></p>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default FriendList;