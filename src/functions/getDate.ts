/**
 * @description - format date as 'dd/mm/yyyy'
 * @param {Date} date - date to format
 * @returns {string} date formatted as 'dd/mm/yyyy'
 */

export default function getDate(date: Date | undefined) {
    if (date) {
        let d = new Date(date);
        let month = d.getMonth() + 1;
        let day = d.getDate();
        let year = d.getFullYear();
        return day + '/' + month + '/' + year;
    }
    return '';
}