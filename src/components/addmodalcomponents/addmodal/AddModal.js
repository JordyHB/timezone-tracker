import React from 'react';
import "./AddModal.css"

function AddModal({children, variant, modalRef, title, closeModal}) {


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