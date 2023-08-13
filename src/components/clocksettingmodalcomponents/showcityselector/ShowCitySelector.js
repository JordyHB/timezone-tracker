import React, {useContext} from 'react';
import {UserPreferencesContext} from "../../../context/UserPreferencesContextProvider";
import {ReactComponent as CheckMark} from "../../../assets/icons/checkmark.svg";
import "./ShowCitySelector.css"

function ShowCitySelector({currentTimezone}) {


    const {changeShownTimeTiles} = useContext(UserPreferencesContext)
    // gets all the timezones javascript supports
    const availableTimezones = Intl.supportedValuesOf('timeZone');


    const handleSubmit = (e) => {

        e.preventDefault()
        // checks if the timezone is valid and exits if it isn't
        if (!availableTimezones.includes(e.target.querySelector('input').value)) {
            alert('Please select a valid timezone')
            return
        }

        // gets the input value and passes it to the context to change the shown time tiles
        changeShownTimeTiles(currentTimezone, e.target.querySelector('input').value)
    }


    return (
            <form onSubmit={handleSubmit} className="selector-container">
                <input list="allTimezones" className="search-bar-input modal-version-input" placeholder={currentTimezone}/>
                <datalist id="allTimezones">
                    {availableTimezones.map((newTimezone) => {
                            return <option value={newTimezone} key={newTimezone}>{newTimezone}</option>
                        }
                    )}
                </datalist>
                <button type="submit" className="search-button modal-version-button"><CheckMark/></button>
            </form>
    );
}

export default ShowCitySelector;