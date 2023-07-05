import React, {createRef, useRef, useState} from 'react';
import AddFriendSearchField from "../addfriendsearchfield/AddFriendSearchField";

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
            <button className="add-friend-button" onClick={openModal}>Add Friend</button>
            <dialog id="add-friend-modal" ref={modalRef}>
                <AddFriendSearchField/>
                <button type="button" className="close-modal-button" onClick={closeModal}>Close</button>
            </dialog>
        </>
    );
}

export default AddFriendModal;