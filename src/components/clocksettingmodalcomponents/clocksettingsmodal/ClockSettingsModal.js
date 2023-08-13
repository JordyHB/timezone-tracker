import React, {useContext} from 'react';
import {UserPreferencesContext} from "../../../context/UserPreferencesContextProvider";
import ShowCitySelector from "../showcityselector/ShowCitySelector";
import "./ClockSettingModal.css"


function ClockSettingsModal({modalRef, closeModal}) {

    //Gets the context
    const {
        clockSettings,
        toggleClockSettings,
        shownTimeTiles,
    } = useContext(UserPreferencesContext)


    return (
        <dialog className="clock-setting-modal" ref={modalRef}>
            {/*in a container so we can apply flexbox*/}
            {clockSettings &&
                <div className="clock-setting-modal-container">
                    <h3 className="modal-subtitle">Time format</h3>
                    {/*slider for 12h/24h format*/}
                    <label className={`toggle-button ${clockSettings['12hourFormat'] ? 'on' : ''}`}
                           onClick={toggleClockSettings}>
                        {/*slider*/}
                        <div className="slider">
                            {/*slider nub*/}
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