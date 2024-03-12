class AdvertisementPayload {
    constructor({ id, shortText, description, images, user, tags, createdAt, updatedAt, isDeleted }) {
        this.id = id;
        this.shortText = shortText;
        this.description = description;
        this.images = images;
        this.user = new UserPayload(user);
        this.tags = tags;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.isDeleted = isDeleted;
    }
}

class UserPayload {
    constructor({ id, name }) {
        this.id = id;
        this.name = name;
    }
}

module.exports = {
    AdvertisementPayload,
};