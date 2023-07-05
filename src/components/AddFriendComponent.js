import React, {useState} from 'react';
import addFriend from "../helpers/firebase/addFriend";

function AddFriendComponent() {

    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const handleSubmit = async(e) => {
        e.preventDefault();
        // addFriend returns a string based on the result of the operation
        const result = await addFriend(e.target['friend-username'].value)
        if (result === 'user not found') {
            setError('User not found')
            setResult(null)
        } else if (result === 'user added') {
            setResult('User added')
            setError(null)
        } else if (result === 'you cannot add yourself') {
            setError('You cannot add yourself')
            setResult(null)
        } else if (result === 'user already in friend list') {
            setError('User already in friend list')
            setResult(null)
        } else {
            setError('There was an error with the Database')
            setResult(null)
        }
}
    return (
        <>
            <h2>Add Friend</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="friend-username">Friend Username: </label>
                <input
                    type="text"
                    id="friend-username"
                    name="friend-username"
                    placeholder="Enter friend username"
                />
                <button type="submit">Add Friend</button>
                {error && <p className="error-message">{error}</p>}
                {result && <p className="success-message">{result}</p>}
            </form>
        </>
    );
}

export default AddFriendComponent;