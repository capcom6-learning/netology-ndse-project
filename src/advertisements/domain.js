class Advertisement {
    constructor({ id, shortText, description, images, userId, createdAt, updatedAt, tags, isDeleted }) {
        this.id = id;
        this.shortText = shortText;
        this.description = description;
        this.images = images;
        this.userId = userId;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.tags = tags || [];
        this.isDeleted = isDeleted || false;
    }
}

module.exports = {
    Advertisement,
};