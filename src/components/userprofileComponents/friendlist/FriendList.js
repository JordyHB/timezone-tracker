import React, {useContext} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";

function FriendList() {

    const {friendList} = useContext(UserInfoContext)

    return (
        <div>
            {friendList && friendList.map((friend) => {
                    return (
                        <div key={friend.uid}>
                            <p>{friend.nickname}</p>
                            <p>{friend.uid}</p>
                            <p>{friend.country}</p>
                        </div>
                    )
                }
            )}
        </div>
    );
}

export default FriendList;