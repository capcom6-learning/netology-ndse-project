const { NotFoundError } = require("../errors");

const users = {};

const get = (id) => {
    if (!users[id]) {
        throw new NotFoundError("User not found");
    }

    return users[id];
};

const find = (filter) => {
    const filterFn = (item) => {
        for (const key in filter) {
            if (filter[key] !== item[key]) {
                return false;
            }
        }
        return true;
    };

    return Object.values(users).filter(filterFn);
};

const insert = (user) => {
    const id = Math.random().toString(16).slice(2);
    users[id] = { ...user, id };
    return id;
};

module.exports = {
    get,
    find,
    insert,
};