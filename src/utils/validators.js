const validateEmail = (email) => {
    // see also email-validator
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePhoneNumber = (phoneNumber) => {
    const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
    return re.test(String(phoneNumber).toLowerCase());
};

const normalizeEmail = (email) => {
    return email.trim().toLowerCase();
};

const normalizePhoneNumber = (phoneNumber) => {
    // use libphonenumber-js
    return phoneNumber.replace(/\D/g, '');
};

module.exports = {
    validateEmail,
    validatePhoneNumber,
    normalizeEmail,
    normalizePhoneNumber,
};