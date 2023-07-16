import React from 'react';
import "./AddModal.css"


// a very simple modal component that will render different content in the children prop
function AddModal({children, variant, modalRef, title, closeModal}) {

    // variant prop determines which modal to render and what title to display
    return (
        <dialog ref={modalRef} className="add-modal">
            {/*in a container so we can apply flexbox*/}
            <div className="add-modal-container">
                <h3 className="add-modal-title">{title}</h3>
                {children}
                <button
                    type="button"
                    className="close-modal-button"
                    onClick={() => closeModal(variant)}
                >
                    Close
                </button>
            </div>
        </dialog>
    );
}

export default AddModal;