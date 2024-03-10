class UserBase {
    constructor(email, name, contactPhone) {
        this.email = email;
        this.name = name;
        this.contactPhone = contactPhone;
    }
}

class UserIn extends UserBase {
    constructor(email, password, name, contactPhone) {
        super(email, name, contactPhone);
        this.password = password;
    }
}

module.exports = {
    UserBase,
    UserIn,
}