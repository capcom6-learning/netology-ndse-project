const { ObjectId } = require("mongodb");

const { NotFoundError } = require("../errors");

const { Advertisement } = require("./models");

const get = async (id) => {
    if (!ObjectId.isValid(id)) {
        throw new NotFoundError("Advertisement not found");
    }

    const advertisement = Advertisement.findById(id);
    if (!advertisement) {
        throw new NotFoundError("Advertisement not found");
    }
    return advertisement;
};

const select = async ({ shortText, description, userId, tags, isDeleted }) => {
    // shortText — поиск регулярным выражением;
    // description — поиск регулярным выражением;
    // userId — точное совпадение;
    // tags — значение в базе данных должно включать все искомые значения.
    const filter = {};

    if (shortText) {
        filter.shortText = new RegExp(shortText, "i");
    }

    if (description) {
        filter.description = new RegExp(description, "i");
    }

    if (userId) {
        filter.userId = userId;
    }

    if (tags) {
        filter.tags = { $all: tags };
    }

    if (isDeleted !== undefined) {
        filter.isDeleted = isDeleted;
    }

    return Advertisement.find(filter);
};

const insert = async (advertisement) => {
    const advertisementModel = new Advertisement(advertisement);
    return await advertisementModel.save();
};

const remove = async (id) => {
    await Advertisement.updateOne({ _id: id }, { isDeleted: true });
};

module.exports = {
    get,
    select,
    insert,
    remove,
};