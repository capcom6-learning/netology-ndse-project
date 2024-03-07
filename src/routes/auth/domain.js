class UserPayload {
    constructor(id, email, name, contactPhone) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.contactPhone = contactPhone;
    }
}

module.exports = {
    UserPayload,
}