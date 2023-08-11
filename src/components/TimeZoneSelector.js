import React, {useEffect, useState} from 'react';

function TimeZoneSelector({labelClassName, inputClassName , query, setQuery, label}) {

    const [filteredTimeZones, setFilteredTimeZones] = useState([]);

    useEffect(() => {
        const availableTimeZones = Intl.supportedValuesOf('timeZone');

        function searchTimeZones(query) {
            return availableTimeZones.filter((timeZone) => {
                return timeZone.toLowerCase().includes(query.toLowerCase());
            });
        }

        setFilteredTimeZones(searchTimeZones(query));
    }, [query])

    return (
        <>
            <label className={labelClassName} htmlFor="timezone">{label}</label>
            <input
                className={inputClassName}
                list="timezones"
                name="timezone"
                id="timezone"
                value={query}
                placeholder="Europe/Amsterdam"
                onChange={(e) => setQuery(e.target.value)}
            />
            <datalist id="timezones">
                {filteredTimeZones.map((timeZone) => {
                    return <option value={timeZone} key={timeZone}/>
                })}
            </datalist>
        </>
    );
}

export default TimeZoneSelector;