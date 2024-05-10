/**
 * description : check if password is strong
 * @param {string} password - password to check strength
 * @returns {boolean} - true if password is strong, false otherwise
 */
const checkStrength = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@:_#$%.^&*])(?=.{8,})/;
        // regex : 1 uppercase, 1 lowercase, 1 number, 1 special character (!@:_#$%.^&*), 8 characters minimum
    if (regex.test(password)) {
        return true;
    } else {
        return false;
    }
};

export default checkStrength;