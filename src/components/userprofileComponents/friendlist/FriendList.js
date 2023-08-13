import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
// context
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
// components
import AddModalOpenButton from "../../addmodalcomponents/addmodalopenbutton/AddModalOpenButton";
// helpers
import fetchFriendList from "../../../helpers/firebase/fetchFriendList";
// styles
import "./FriendList.css"


function FriendList({id}) {

    const [friendList, setFriendList] = useState(null)

    const userContext  = useContext(UserInfoContext)

    const navigate = useNavigate()


    useEffect(() => {

        async function fetchRequestedUserFriendList() {
            setFriendList(await fetchFriendList(id))
        }
        //fetches the friend list from a requested user if not the auth user
        if (id && id !== userContext?.user?.username && id !== 'myprofile') {
            void fetchRequestedUserFriendList(id)
        } else {
            // takes the friend list from the context if the user is the auth user
            setFriendList(userContext.friendList)
        }

        // cleans up the old data in case of profile hopping
        return () => {
            setFriendList(null)
        }
    }, [id, userContext])

    return (
        <article className="friend-list-container user-profile-tile">
            <h3 className="friend-group-title">Friends List:</h3>
            {/*only renders the button if on your own profile*/}
            {!id && <AddModalOpenButton variant="add-friend"/>}
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