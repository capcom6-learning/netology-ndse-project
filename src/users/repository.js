const { NotFoundError } = require("../errors");

const { User } = require("./models");

const get = async (id) => {
    const user = await User.findById(id);
    if (!user) {
        throw new NotFoundError("User not found");
    }
    return user;
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