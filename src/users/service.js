const argon2 = require("argon2");

const { ValidationError, ConflictError } = require("../errors");
const { validateEmail, validatePhoneNumber, normalizeEmail, normalizePhoneNumber } = require("../utils/validators");
const users = require("./repository");
const { UserModel } = require("./domain");

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

const create = async (user) => {
    user = validate(user);

    if (users.select({ email: user.email }).length > 0) {
        throw new ConflictError("User with this email already exists");
    }

    const userModel = new UserModel(
        null,
        user.email,
        await argon2.hash(user.password),
        user.name,
        user.contactPhone
    );

    const id = users.insert(userModel);

    return users.get(id);
};

const findByEmail = async (email) => {
    const found = users.select({ email });

    if (found.length === 0) {
        return null;
    }

    return found[0];
};

const authorize = async (email, password) => {
    const user = await findByEmail(email);
    if (!user) {
        return null;
    }

    if (!argon2.verify(user.passwordHash, password)) {
        return null;
    }

    return user;
};

module.exports = {
    create,
    findByEmail,
    authorize,
};