/**
 * @description - Checks if the provided date is today
 * @param {Date} date - The date to check
 * @returns {boolean} True if the date is today, otherwise false
 */

export default function isToday(date: Date | string): boolean {
    let dateObj: Date;

    if (date instanceof Date) {
        dateObj = date;
    } else if (typeof date === 'string') {
        dateObj = new Date(date);
    } else {
        return false;
    }

    // Validate the Date object
    if (isNaN(dateObj.getTime())) {
        return false;
    }

    const today = new Date();
    return (
        dateObj.getDate() === today.getDate() &&
        dateObj.getMonth() === today.getMonth() &&
        dateObj.getFullYear() === today.getFullYear()
    );
}
