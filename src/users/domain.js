class UserBase {
    constructor(email, name, contactPhone) {
        this.email = email;
        this.name = name;
        this.contactPhone = contactPhone;
    }
}

class UserModel extends UserBase {
    constructor(id, email, passwordHash, name, contactPhone) {
        super(email, name, contactPhone);
        this.id = id;
        this.passwordHash = passwordHash;
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
    UserModel,
    UserIn,
}