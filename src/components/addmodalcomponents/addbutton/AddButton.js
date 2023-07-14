import React, {useRef} from 'react';
import './AddButton.css'
import {ReactComponent as PlusIcon} from "../../../assets/icons/plusicon.svg";
import AddFriendSearchField
    from "../addfriendsearchfield/AddFriendSearchField";
import AddModal from "../addmodal/AddModal";


function AddButton({variant, groupID}) {

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
            console.log("add group member")
            console.log(groupID)
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
            <AddModal
                modalRef={addFriendModalRef}
                title="Add Friend:"
                variant="add-friend"
                closeModal={() => closeModal(variant)}
            >
                <AddFriendSearchField/>
            </AddModal>

        </>


    );
}

export default AddButton;