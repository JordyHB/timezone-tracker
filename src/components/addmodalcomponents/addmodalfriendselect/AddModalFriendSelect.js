import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
// context
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
// helpers
import addMemberToGroup from "../../../helpers/firebase/addMemberToGroup";
// styles
import "./AddModalFriendSelect.css"


function AddModalFriendSelect() {

    // states
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [query, setQuery] = useState('');
    const [filteredFriends, setFilteredFriends] = useState([]);

    // context and params
    const {friendList} = useContext(UserInfoContext);
    const {id} = useParams()


    // handles the submit event
    async function handleSubmit(e) {
        e.preventDefault();
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


    // runs the filterFriends function when the query or friendList changes
    useEffect(() => {

        // filters the friends list based on the query
        function filterFriends(query) {
            const filteredFriends = friendList.filter((friend) => {
                const friendName = friend.username.toLowerCase();
                return friendName.includes(query.toLowerCase());
            });
            setFilteredFriends(filteredFriends);
        }

        filterFriends(query);
    }, [query, friendList])


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
                        autoComplete="off"
                        // sets the value to no friends found if there are no friends in the list
                        value={friendList.length > 0 ? query : 'No friends found'}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {/*otherwise, it sets the datalist to the filtered friends*/}
                    {friendList.length !== 0 &&
                        <datalist id="friends">
                            {filteredFriends.map((friend) => {
                                    return <option value={friend.username} key={friend.uid}/>
                                }
                            )}
                        </datalist>
                    }
                    <button type="submit" className="add-modal-submit-button"
                            disabled={filteredFriends.length === 0}>Add
                    </button>
                </div>
            </form>
            {error && <p className="error-message">{error}</p>}
            {result && <p className="success-message">{result}</p>}
        </>
    );
}

export default AddModalFriendSelect;