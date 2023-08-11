import React, {useContext} from 'react';
import "./ClockSettingModal.css"
import {UserPreferencesContext} from "../../../context/UserPreferencesContextProvider";
import ShowCitySelector from "../showcityselector/ShowCitySelector";

function ClockSettingsModal({modalRef, closeModal}) {

    const {
        clockSettings,
        toggleClockSettings,
        shownTimeTiles,
    } = useContext(UserPreferencesContext)

    const handleToggle = () => {
        //Updates the context
        toggleClockSettings()
    };

    return (
        <dialog className="clock-setting-modal" ref={modalRef}>
            {/*in a container so we can apply flexbox*/}
            {clockSettings &&
                // slider to change between 12h and 24h format*/}
                <div className="clock-setting-modal-container">
                    <h3 className="modal-subtitle">Time format</h3>
                    <label className={`toggle-button ${clockSettings['12hourFormat'] ? 'on' : ''}`}
                           onClick={handleToggle}>
                        <div className="slider">
                            <span className="label">{clockSettings['12hourFormat'] ? '12h' : '24h'}</span>
                        </div>
                    </label>
                    {/*displays the currently shown time tiles*/}
                    <h3 className="modal-subtitle">Shown time tiles</h3>
                    {shownTimeTiles.map((timezone, index) => {
                            return <ShowCitySelector currentTimezone={timezone} key={index}/>
                        }
                    )}
                    <button
                        type="button"
                        className="close-modal-button"
                        onClick={() => closeModal()}
                    >
                        Close
                    </button>
                </div>
            }
        </dialog>
    );
}

export default ClockSettingsModal;