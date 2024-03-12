const { UserModule } = require("../users");

const advertisements = require("./repository");

const get = async (id) => {
    const advertisement = await advertisements.get(id);
    return await fillReferences(advertisement);
};

const find = async (params) => {
    const data = await advertisements.select({ ...params, isDeleted: false });
    return Promise.all(data.map(async advertisement => await fillReferences(advertisement)));
};

const create = async (data) => {
    const advertisement = await advertisements.insert(data);

    return await fillReferences(advertisement);
};

const remove = async (id) => {
    await advertisements.remove(id);
};

const fillReferences = async (data) => {
    //  TODO: optimize users linking
    if (data.userId) {
        const user = await UserModule.get(data.userId);
        data.user = {
            id: user.id,
            name: user.name,
        };
    }

    return data;
};

module.exports = {
    get,
    find,
    create,
    remove,
};