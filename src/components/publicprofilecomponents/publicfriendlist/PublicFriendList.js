import React, {useState, useEffect} from 'react';
import fetchFriendList from "../../../helpers/firebase/fetchFriendList";
import {useNavigate} from "react-router-dom";

function PublicFriendList({username}) {

    const [friendList, setFriendList] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {

        async function fetchRequestedUserFriendList() {
            setFriendList(await fetchFriendList(username))
        }

        void fetchRequestedUserFriendList()
    }, [username])

    return (
        <div className="friend-list-container">
            <h3 className="friend-list-title">Friends List</h3>
            {friendList && console.log(friendList)}
            {friendList && friendList.length === 0 && <p>Friend list is empty</p>}
            {friendList && friendList.map((friend) => {
                    return (
                        // clicking on the friend preview will navigate to the friend's profile
                        <div className="friend-preview" key={friend.uid} onClick={() => {navigate(`/profile/${friend.username}`)}} >
                            <p>Nick: <span>{friend.nickname}</span></p>
                            <p>Time zone: <span>{friend.timezone}</span></p>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default PublicFriendList;