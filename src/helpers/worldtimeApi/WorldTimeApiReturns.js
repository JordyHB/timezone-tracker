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


