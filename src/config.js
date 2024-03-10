require("dotenv").config();

module.exports = {
    DEBUG: process.env.DEBUG || false,

    HTTP_PORT: process.env.HTTP_PORT || 3000,
    HTTP_HOST: process.env.HTTP_HOST || "127.0.0.1",
    SESSION_SECRET: process.env.SESSION_SECRET || "keyboard cat",
    UPLOAD_PATH: process.env.UPLOAD_PATH || "uploads",
    MONGO_URL: process.env.MONGO_URL || "mongodb://localhost:27017/advertisements",
};