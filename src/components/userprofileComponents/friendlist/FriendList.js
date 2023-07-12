import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import "./FriendList.css"
import {useNavigate} from "react-router-dom";
import AddButton from "../../addbutton/AddButton";

function FriendList() {

    const {friendList} = useContext(UserInfoContext)
    const navigate = useNavigate()

    return (
        <article className="friend-list-container user-profile-tile">
            <h3 className="friend-group-title">Friends List:</h3>
            {/* wrapper to have scrollbar in a nice way*/}
            <AddButton variant="add-friend"/>
            {friendList && friendList.length === 0 && <p>Friend list is empty</p>}
            {friendList && friendList.map((friend) => {
                    return (
                        <div
                            // clicking on the friend preview will navigate to the friend's profile
                            className="friend-preview friend-group-body-text"
                            key={friend.username}
                            onClick={() => {
                                navigate(`/profile/${friend.username}`)
                            }}>
                            <p><span>{friend.nickname}</span></p>
                        </div>
                    )
                }
            )}
        </article>
    );
}

export default FriendList;