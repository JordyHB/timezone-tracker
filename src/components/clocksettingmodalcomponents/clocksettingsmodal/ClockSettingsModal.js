import React, {useContext, useState} from 'react';
import "./ClockSettingModal.css"
import {ClockSettingsContext} from "../../../context/ClockSettingsContextProvider";

function ClockSettingsModal({modalRef, closeModal}) {

    const {clockSettings, toggleClockSettings} = useContext(ClockSettingsContext)
    const [is12HourFormat, setIs12HourFormat] = useState(true);
    const handleToggle = () => {
        //Updates the context
        toggleClockSettings()
    };


    return (
        <dialog className="clock-setting-modal" ref={modalRef}>
            {/*in a container so we can apply flexbox*/}
            <div className="clock-setting-modal-container">
                <label className={`toggle-button ${clockSettings['12hourFormat'] ? 'on' : ''}`} onClick={handleToggle}>
                    <div className="slider">
                        <span className="label">{clockSettings['12hourFormat'] ? '12h' : '24h'}</span>
                    </div>
                </label>
                <button
                    type="button"
                    className="close-modal-button"
                    onClick={() => closeModal()}
                >
                    Close
                </button>
            </div>
        </dialog>
    );
}

export default ClockSettingsModal;