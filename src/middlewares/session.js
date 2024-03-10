const session = require("express-session");
const store = require("connect-mongo");

module.exports = ({ secret, mongoUrl }) => {
    return session({
        store: store.create({
            mongoUrl
        }),
        cookie: { maxAge: 7200 * 1000 },
        secret: secret,
        resave: false,
        saveUninitialized: false
    })
};