const { NotFoundError } = require("../errors");

const advertisements = {
    "507f1f77bcf86cd799439012": {
        id: "507f1f77bcf86cd799439012",
        shortTitle: "Продам слона",
        description: "kulagin@netology.ru",
        images: [
            "/uploads/507f1f77bcf86cd799439011/slon_v_profil.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_v_fas.jpg",
            "/uploads/507f1f77bcf86cd799439011/slon_hobot.jpg"
        ],
        user: {
            id: "507f1f77bcf86cd799439011",
            name: "Alex Kulagin"
        },
        createdAt: "2020-12-12T10:00:00.000Z",
        isDeleted: false
    },
};

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