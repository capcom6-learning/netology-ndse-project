const config = require("./config");

const mongoose = require("mongoose");
const express = require("express");
require('express-async-errors');

const session = require("./middlewares/session");
const logger = require("./middlewares/logger");
const { authBySession } = require("./middlewares/passport");

function createExpressApp() {
    const app = express();

    app.use(logger);
    app.use(session({
        secret: config.SESSION_SECRET,
        mongoUrl: config.MONGO_URL,
    }));
    app.use(authBySession);
    app.use("/api", express.json(), require("./routes"));

    return app;
}

async function connect() {
    mongoose.set('debug', config.DEBUG);
    return mongoose.connect(config.MONGO_URL);
}

async function main() {
    const app = createExpressApp();
    await connect();
    console.log("MongoDB connected");

    app.listen(
        config.HTTP_PORT,
        config.HTTP_HOST,
        () => {
            console.log(`Server started at http://${config.HTTP_HOST}:${config.HTTP_PORT}`);
        }
    );
}

process.on('SIGTERM', () => process.exit(0));
process.on('SIGINT', () => process.exit(0));
main()
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
