const config = require("./config");

const express = require("express");
const session = require("express-session");
require('express-async-errors');

const logger = require("./middlewares/logger");

const app = express();

app.use(logger);

app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));
app.use("/api", express.json(), require("./routes"));

app.listen(config.PORT, () => {
    console.log(`Server started at http://127.0.0.1:${config.PORT}`);
});
