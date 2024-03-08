const { Advertisement } = require("./domain");
const advertisements = require("./repository");

const find = async (params) => {
    const data = await advertisements.select(params);
    return data;
};

const create = async (data) => {
    const advertisement = new Advertisement(data);

    advertisement.id = await advertisements.insert(advertisement);

    return advertisement;
};

const remove = async (id) => {
    await advertisements.remove(id);
};

module.exports = {
    find,
    create,
    remove,
};