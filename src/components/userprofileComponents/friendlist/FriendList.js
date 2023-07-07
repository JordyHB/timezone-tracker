import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import AddFriendModal from "./friendlistcomponents/addfriendmodal/AddFriendModal";
import "./FriendList.css"
import {useNavigate} from "react-router-dom";

function FriendList() {

    const {friendList} = useContext(UserInfoContext)
    const navigate = useNavigate()

    return (
        <div className="friend-list-container">
            <h3 className="friend-list-title">Friends List</h3>
            <AddFriendModal/>
            {friendList && console.log(friendList)}
            {friendList && friendList.length === 0 && <p>Friend list is empty</p>}
            {friendList && friendList.map((friend) => {
                    return (
                        // clicking on the friend preview will navigate to the friend's profile
                        <div
                            className="friend-preview" key={friend.uid}
                            onClick={() => {
                                navigate(`/profile/${friend.username}`)
                            }}>
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