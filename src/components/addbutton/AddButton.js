import React, {useRef} from 'react';
import './AddButton.css'
import {ReactComponent as PlusIcon} from "../../assets/icons/plusicon.svg";
import AddFriendSearchField
    from "../userprofileComponents/friendlist/friendlistcomponents/addfriendsearchfield/AddFriendSearchField";


function AddButton({variant}) {

    const addFriendModalRef = useRef(null)

    // handles opening the different modals
    const openModal = (variant) => {
        // checks variant prop to determine which modal to open
        if (variant === 'add-friend') {
            addFriendModalRef.current.showModal()
        }
        if (variant === 'add-group') {
            console.log('add group')
        }
        if (variant === 'add-group-member') {
            console.log("add group")
        }

    }

    const closeModal = (variant) => {
        // checks variant prop to determine which modal to close
        if (variant === 'add-friend') {
            addFriendModalRef.current.close()
        }
        if (variant === 'add-group') {
            console.log('add group')
        }
        if (variant === 'add-group-member') {
            console.log("add group")
        }
    }


    return (
        <>
            <button type='button'
                    onClick={() => openModal(variant)}
                    className='add-button'
            >
                <PlusIcon className="add-button-icon" fill="#302F2F"/>
            </button>
            {/*add friend modal opens here*/}
            <dialog ref={addFriendModalRef} className="add-friend-modal">
                <h3 className="add-friend-modal-title">Add Friend:</h3>
                <AddFriendSearchField/>
                <button
                    type="button"
                    className="close-modal-button"
                    onClick={() => closeModal(variant)}
                >
                    Close
                </button>
            </dialog>
        </>


    );
}

export default AddButton;