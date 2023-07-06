import React, { useRef } from 'react';
import AddFriendSearchField from "../addfriendsearchfield/AddFriendSearchField";
import "./AddFriendModal.css"

function AddFriendModal() {
    const modalRef = useRef(null)
    const openModal = () => {
        modalRef.current.showModal()
    }

    const closeModal = () => {
        modalRef.current.close()
    }

    return (
        <>
            <button className="open-add-friend-button" onClick={openModal}>Add Friend</button>
            <dialog ref={modalRef} className="add-friend-modal">
                <h3 className="add-friend-modal-title">Add Friend:</h3>
                <AddFriendSearchField/>
                <button type="button" className="close-modal-button" onClick={closeModal}>Close</button>
            </dialog>
        </>
    );
}

export default AddFriendModal;