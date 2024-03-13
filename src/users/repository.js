const { ObjectId } = require("mongodb");

const { NotFoundError } = require("../errors");

const { User } = require("./models");

const get = async (id) => {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    return await User.findById(id);
};

const select = async (filter) => {
    return User.find(filter);
};

const insert = async (user) => {
    const userModel = new User(user);
    return await userModel.save();
};

module.exports = {
    get,
    select,
    insert,
};