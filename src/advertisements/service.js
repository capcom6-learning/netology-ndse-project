const { UserModule } = require("../users");

const { Advertisement } = require("./domain");
const advertisements = require("./repository");

const find = async (params) => {
    const data = await advertisements.select(params);
    return Promise.all(data.map(async advertisement => await fillReferences(advertisement)));
};

const create = async (data) => {
    const advertisement = new Advertisement(
        {
            ...data,
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        }
    );

    advertisement.id = await advertisements.insert(advertisement);

    return await fillReferences(advertisement);
};

const remove = async (id) => {
    await advertisements.remove(id);
};

const fillReferences = async (data) => {
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
    find,
    create,
    remove,
};