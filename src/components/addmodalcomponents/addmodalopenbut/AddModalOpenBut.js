import React, {useRef} from 'react';
import './AddModalOpenBut.css'
import {ReactComponent as PlusIcon} from "../../../assets/icons/plusicon.svg";
import AddModalSearchField
    from "../addmodalsearchfield/AddModalSearchField";
import AddModal from "../addmodal/AddModal";
import createGroup from "../../../helpers/firebase/createGroup";


function AddModalOpenBut({variant, groupID}) {

    // initialising the modal refs
    const addFriendModalRef = useRef(null)
    const createGroupModalRef = useRef(null)
    const addGroupMemberModalRef = useRef(null)

    // handles opening the different modals
    const openModal = (variant) => {
        // checks variant prop to determine which modal to open
        if (variant === 'add-friend') {
            addFriendModalRef.current.showModal()
        }
        if (variant === 'create-group') {
            createGroupModalRef.current.showModal()
        }
        if (variant === 'add-group-member') {
            addGroupMemberModalRef.current.showModal()
        }

    }

    const closeModal = (variant) => {
        // checks variant prop to determine which modal to close
        if (variant === 'add-friend') {
            addFriendModalRef.current.close()
        }
        if (variant === 'create-group') {
            createGroupModalRef.current.close()
        }
        if (variant === 'add-group-member') {
            addGroupMemberModalRef.current.close()
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
                {/*adds an input bar that handles adding friends*/}
                <AddModalSearchField variant="add-friend" placeholderText="your friends Username"/>
            </AddModal>
            {/*create group modal opens here*/}
            <AddModal
                modalRef={createGroupModalRef}
                title="Create Group:"
                variant="create-group"
                closeModal={() => closeModal(variant)}
            >
                {/*adds an input bar that handles setting group names*/}
                <AddModalSearchField variant="create-group" placeholderText="Set a group name"/>
            </AddModal>

        </>


    );
}

export default AddModalOpenBut;