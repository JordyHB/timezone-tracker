import React, {useContext, useEffect, useState} from 'react';
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import addMemberToGroup from "../../../helpers/firebase/addMemberToGroup";
import {useParams} from "react-router-dom";

function AddModalFriendSelect() {

    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    const {friendList} = useContext(UserInfoContext);
    const {id} = useParams()

    function filterFriends(query) {
        const filteredFriends = friendList.filter((friend) => {
            const friendName = friend.username.toLowerCase();
            return friendName.includes(query.toLowerCase());
        });
        setFilteredFriends(filteredFriends);
    }

    useEffect(() => {
        filterFriends(query);
    }, [query])

    async function handleSubmit(e) {
        e.preventDefault();
        console.log('ran')
        console.log(filteredFriends[0])
        const addResult = await addMemberToGroup(id, filteredFriends[0])

        if (addResult === 'user added') {
            setResult('User added')
            setError(null)
        } else if (addResult === 'user already in group') {
            setError('User already in group')
            setResult(null)
        } else {
            setError('There was an error with the Database')
            setResult(null)
        }


    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label className="add-modal-label" htmlFor="friend">Friend to add:</label>
                <div className="button-input-container">
                    <input
                        type="text"
                        className="add-modal-input"
                        list="friends"
                        name="friend"
                        id="friend"
                        placeholder="friends Username"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <datalist id="friends">
                        {filteredFriends.map((friend) => {
                                return <option value={friend.username} key={friend}/>
                            }
                        )}
                    </datalist>
                    <button type="submit" className="add-modal-submit-button">Add</button>
                </div>
            </form>

        </>
    );
}

export default AddModalFriendSelect;