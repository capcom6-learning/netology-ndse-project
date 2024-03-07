const { NotFoundError } = require("../errors");

const users = {
    "507f1f77bcf86cd799439011": {
        id: "507f1f77bcf86cd799439011",
        email: "kulagin@netology.ru",
        name: "Alex Kulagin",
        contactPhone: "+7 123 456 78 90"
    },
};

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