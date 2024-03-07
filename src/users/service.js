const { ValidationError, ConflictError } = require("../errors");
const { validateEmail, validatePhoneNumber, normalizeEmail, normalizePhoneNumber } = require("../utils/validators");
const users = require("./repository");

/*
{
  "email": "kulagin@netology.ru",
  "password": "ad service",
  "name": "Alex Kulagin",
  "contactPhone": "+7 123 456 78 90"
}
*/

const validatePassword = (password) => {
    if (password.length < 8) {
        return false;
    }

    return true;
};


const validate = (user) => {
    if (!user.email) {
        throw new ValidationError("Email is required");
    }
    if (!user.password) {
        throw new ValidationError("Password is required");
    }
    if (!user.name) {
        throw new ValidationError("Name is required");
    }

    if (!validateEmail(user.email)) {
        throw new ValidationError("Email is invalid");
    }
    if (!validatePassword(user.password)) {
        throw new ValidationError("Password must be at least 8 characters long");
    }
    if (user.contactPhone && !validatePhoneNumber(user.contactPhone)) {
        throw new ValidationError("Contact phone is invalid");
    }

    user.email = normalizeEmail(user.email);
    user.contactPhone = user.contactPhone ? normalizePhoneNumber(user.contactPhone) : null;

    return user;
};

const create = (user) => {
    user = validate(user);

    if (users.find({ email: user.email }).length > 0) {
        throw new ConflictError("User with this email already exists");
    }

    const id = users.insert(user);

    return users.get(id);
};

module.exports = {
    create,
};