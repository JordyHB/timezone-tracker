import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import AddFriendModal from "./friendlistcomponents/addfriendmodal/AddFriendModal";

function FriendList() {

    const {friendList} = useContext(UserInfoContext)

    return (
        <div>
            <h2>Friend List</h2>
            <AddFriendModal/>
            {friendList && console.log(friendList)}
            {friendList && friendList.length === 0 && <p>Friend list is empty</p>}
            {friendList && friendList.map((friend) => {
                    return (
                        <div key={friend.uid}>
                            <p>Nick: <span>{friend.displayName}</span></p>
                            <p>Time zone: <span>{friend.timezone}</span></p>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default FriendList;