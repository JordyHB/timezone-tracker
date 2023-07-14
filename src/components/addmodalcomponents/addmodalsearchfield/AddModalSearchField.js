import React, {useContext, useState} from 'react';
import addFriend from "../../../helpers/firebase/addFriend";
import {UserInfoContext} from "../../../context/UserInfoContextProvider";
import './AddModalSearchField.css'
import createGroup from "../../../helpers/firebase/createGroup";

function AddModalSearchField({ variant, placeholderText }) {

    const [error, setError] = useState(null)
    const [result, setResult] = useState(null)
    const [userInput, setUserInput] = useState('')

    const {user} = useContext(UserInfoContext)

    // handles submitting the form based on the variant prop
    const handleSubmit = async (e) => {

        // prevents reloading the page
        e.preventDefault();
        if (variant === 'add-friend') {
            // addFriend returns a string based on the result of the operation
            const friendResult = await addFriend(user, userInput)
            // updates the states based on the return
            if (friendResult === 'user not found') {
                setError('User not found')
                setResult(null)
            } else if (friendResult === 'user added') {
                setResult('User added')
                setError(null)
            } else if (friendResult === 'you cannot add yourself') {
                setError('You cannot add yourself')
                setResult(null)
            } else if (friendResult === 'user already in friend list') {
                setError('User already in friend list')
                setResult(null)
            } else {
                setError('There was an error with the Database')
                setResult(null)
            }
            //resets to an empty field
            setUserInput('')
        }

        //handles the code if a new group is being requested
        if (variant === 'create-group') {
            const groupResult = await createGroup(user, userInput)
            if (groupResult === 'group created') {
                setResult('Group created')
                setError(null)

            } else if (groupResult === 'group already exists') {
                setError('Group already exists')
                setResult(null)
            }

        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className='add-modal-form'>
                <label htmlFor="add-modal-field" className="add-modal-label">Friend Username: </label>
                <div className="button-input-container">
                    <input
                        type="text"
                        className="add-modal-input"
                        id="add-modal-field"
                        name="add-modal-field"
                        placeholder={placeholderText}
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <button type="submit" className="add-modal-submit-button">Add</button>
                </div>
                {error && <p className="error-message">{error}</p>}
                {result && <p className="success-message">{result}</p>}
            </form>
        </>
    );
}

export default AddModalSearchField;