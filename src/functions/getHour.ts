
/**
 * @description Get and format hour from a Date object
 * @param {Date} hour - date to format
 * @returns {string} hour formatted as 'hh:mm'
 */
export default function getHour(hour: Date | undefined) {
    if (hour) {
        let d = new Date(hour);
        let _hour = d.getHours();
        let minutes = d.getMinutes();
        return (minutes === 0) ? _hour + 'h' : _hour + 'h' + minutes;
    }
    return '';
}