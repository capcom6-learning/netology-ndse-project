const config = require("./config");

const path = require("path");
const mongoose = require("mongoose");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require('express-async-errors');

const session = require("./middlewares/session");
const logger = require("./middlewares/logger");
const { authBySession, requireUser } = require("./middlewares/passport");

function setUpSocket(io) {
    io.on("connection", socket => {
        console.log(`Socket ${socket.id} connected`);

        require("./routes/socket.io").register(io, socket);
    });
}

function createExpressApp() {
    const sessionMiddleware = session({
        secret: config.SESSION_SECRET,
        mongoUrl: config.MONGO_URL,
    });

    const app = express();
    const httpServer = createServer(app);
    const io = new Server(httpServer, {});
    io.engine.use(sessionMiddleware);
    io.engine.use(authBySession);
    io.engine.use(requireUser);
    setUpSocket(io);

    app.use(logger);
    app.use(sessionMiddleware);
    app.use(authBySession);
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'public/index.html'));
    });
    app.use("/api", express.json(), require("./routes"));

    return httpServer;
}

async function connect() {
    mongoose.set('debug', config.DEBUG);
    await mongoose.connect(config.MONGO_URL);
    console.log("MongoDB connected");
}

async function main() {
    await connect();
    const app = createExpressApp();

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
