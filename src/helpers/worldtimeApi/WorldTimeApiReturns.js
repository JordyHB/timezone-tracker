export function fetchDSTChangeDate(timeData) {
    // fetches the date of the next daylight savings time change in a day/month format

    // if the dst_from property is null, then the timezone does not observe daylight savings time
    if (timeData.dst_from === null) {
        return 'Never'
    }
    // if the dst property is true, then the timezone is currently observing daylight savings time
    if (timeData.dst) {
        const date = new Date(timeData.dst_until)
        return date.toLocaleString('En-Gb', {month: 'long', day: 'numeric'})
        // if the dst property is false, then the timezone is not currently observing daylight savings time
    } else {
        const date = new Date(timeData.dst_from)
        return date.toLocaleString('En-Gb', {month: 'long', day: 'numeric'})
    }

}

// fetches the current date in a day/month format
export function fetchCurrentDate(timeData) {

    // removes the milliseconds from the datetime string and converts it to a date object
    const fixedDateTime = timeData.datetime.split('.')[0]
    const date = new Date(fixedDateTime)
    return date.toLocaleString('En-Gb', {weekday: 'long', month: 'long', day: 'numeric'})
}

export function checkForValidAbbreviation(abbreviation) {

    // checks if the abbreviation is valid by looking whether its trying to return a timezone offset
    if (abbreviation.includes('+') || abbreviation.includes('-')) {
        return 'None found'
    } else return abbreviation
}

export function fetchTimezoneOffset(requestedUserTimezone, authUserTimezone) {
    // fetches the timezone offset between the auth user's timezone and the timezone of the user whose info is being displayed


    // sets a new date for both the users timezone and the requested users timezone to be compared against.
    const currentDate = new Date();

    // fetches the timezone offset for both the auth user and the requested user
    const authUserOffset = currentDate.toUTCString('en-gb', { timeZoneName: 'short', timeZone: authUserTimezone}).split('GMT')[1]
    const requestedUserOffset = currentDate.toUTCString('en-gb', { timeZoneName: 'short', timeZone: requestedUserTimezone}).split('GMT')[1];

    // creates an array of the offsets for easy mapping
    const offsetsToCompare = [authUserOffset, requestedUserOffset]

    // maps over the array of offsets and converts them to numbers
    const numericOffsets = offsetsToCompare.map(offset => {
        // if the timezone is gmt 0 then it will return 0 and not try to split the string
        if (offset === undefined) {
            return 0
        }
        // splits the offset into hours and minutes before adding minutes as a decimal to the hours
        let offsetHours = Number(offset.split(':')[0]);
        let offsetMinutes = Number(offset.split(':')[1]);
        // coverts minutes to a decimal and adds it to hours if minutes is a NaN value it will return 0
        return  (offsetHours + (offsetMinutes ? offsetMinutes / 60 : 0))
    })

    // if the auth user's offset is greater than the requested user's offset, then the auth user is ahead of the requested user
    if (numericOffsets[0] > numericOffsets[1]) {
        return `${numericOffsets[0] - numericOffsets[1]} hours ahead`
    // if the auth user's offset is less than the requested user's offset, then the auth user is behind the requested user
    } else if (numericOffsets[0] < numericOffsets[1]) {
        return `${numericOffsets[1] - numericOffsets[0]} hours behind`
    } else {
        return 'in the same timezone'
    }
}




