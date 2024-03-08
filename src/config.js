require("dotenv").config();

module.exports = {
    PORT: process.env.PORT || 3000,
    SESSION_SECRET: process.env.SESSION_SECRET || "keyboard cat",
    UPLOAD_PATH: process.env.UPLOAD_PATH || "uploads",
};