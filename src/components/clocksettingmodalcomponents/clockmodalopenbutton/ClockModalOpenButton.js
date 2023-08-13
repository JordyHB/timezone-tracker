import React, {useRef} from 'react';
import ClockSettingsModal from "../clocksettingsmodal/ClockSettingsModal";
import {ReactComponent as SettingsIcon} from "../../../assets/icons/settingsicon.svg"


function ClockModalOpenButton() {

    // initializes the modal ref
    const clockSettingModalRef = useRef(null)

    // opens the modal
    const openModal = () => {
        clockSettingModalRef.current.showModal()
    }

    // closes the modal
    const closeModal = () => {
        clockSettingModalRef.current.close()
    }


    return (
        <>
            <div className="settings-icon-wrapper" onClick={openModal}>
                <SettingsIcon className="settings-icon"/>
            </div>
            <ClockSettingsModal
                modalRef={clockSettingModalRef}
                closeModal={closeModal}
            />
        </>
    );
}

export default ClockModalOpenButton;