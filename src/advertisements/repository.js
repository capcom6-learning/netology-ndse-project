const { NotFoundError } = require("../errors");

const advertisements = {};

const get = async (id) => {
    if (!advertisements[id]) {
        throw new NotFoundError("Advertisement not found");
    }

    return advertisements[id];
};

const select = async (filter) => {
    const filterFn = (item) => {
        for (const key in filter) {
            if (filter[key] !== item[key]) {
                return false;
            }
        }
        return true;
    };

    return Object.values(advertisements).filter(filterFn);
};

const insert = async (advertisement) => {
    const id = Math.random().toString(16).slice(2);
    advertisements[id] = { ...advertisement, id };
    return id;
};

const remove = async (id) => {
    if (!advertisements[id]) {
        return;
    }
    delete advertisements[id];
};

module.exports = {
    get,
    select,
    insert,
    remove,
};