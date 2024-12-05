
/**
 * @description Get and format hour from a Date object
 * @param {Date} hour - date to format
 * @returns {string} hour formatted as 'hh:mm'
 */
export default function getHour(hour: Date | undefined) {
    if (hour) {
        let d = new Date(hour);
        let _hour = d.getHours();
        let minutes = d.getMinutes().toString().padStart(2, '0');
        return _hour + ':' + minutes;
    }
    return '';
}