import React, {useEffect, useState} from 'react';

function TimeZoneSelector({labelClassName, inputClassName}) {

    const [query, setQuery] = useState('');
    const [filteredTimeZones, setFilteredTimeZones] = useState([]);

    useEffect(() => {
        const availableTimeZones = Intl.supportedValuesOf('timeZone');
        console.log(availableTimeZones);

        function searchTimeZones(query) {
            return availableTimeZones.filter((timeZone) => {
                return timeZone.toLowerCase().includes(query.toLowerCase());
            });
        }

        setFilteredTimeZones(searchTimeZones(query));
        console.log(filteredTimeZones);
    }, [query])

    return (
        <>
            <label className={labelClassName} htmlFor="timezone">Time Zone:</label>
            <input
                className={inputClassName}
                list='timezones'
                name='timezone'
                id='timezone'
                onChange={(e) => setQuery(e.target.value)}
            />
            <datalist id={'timezones'}>
                {filteredTimeZones.map((timeZone) => {
                    return <option value={timeZone} key={timeZone}/>
                })}
            </datalist>
        </>
    );
}

export default TimeZoneSelector;