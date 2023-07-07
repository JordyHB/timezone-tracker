import React, { useContext } from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";

function GroupList() {

    const {groupList} = useContext(UserInfoContext)


    return (
        <article className="group-list-container">
            <h3 className="group-list-title">Groups List</h3>
            <p>Groups list is empty</p>
        </article>
    );
}

export default GroupList;