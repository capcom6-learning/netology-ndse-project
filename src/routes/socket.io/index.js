const chat = require("./chat");

const register = (io, socket) => {
    chat.register(io, socket);
};

module.exports = {
    register,
};