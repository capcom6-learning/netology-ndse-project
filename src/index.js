const config = require("./config");

const express = require("express");
const session = require("express-session");
require('express-async-errors');

const logger = require("./middlewares/logger");
const { authBySession } = require("./middlewares/passport");

const app = express();

app.use(logger);

app.use(session({
    cookie: { maxAge: 7200 * 1000 },
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use(authBySession);
app.use("/api", express.json(), require("./routes"));

app.listen(config.PORT, () => {
    console.log(`Server started at http://127.0.0.1:${config.PORT}`);
});
