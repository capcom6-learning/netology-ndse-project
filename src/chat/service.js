const { EventEmitter } = require("events");

const { Chat } = require("./models");

const emitter = new EventEmitter();

const find = async (users) => {
    return await Chat.findOne({ users: { $all: users } });
};

const sendMessage = async ({ author, receiver, text }) => {
    const chat = await find([author, receiver]) || await Chat.create({ users: [author, receiver] });

    const message = chat.messages.create({ author, text });
    chat.messages.push(message);
    await chat.save();

    emitter.emit("message", { chatId: chat._id, message });

    return message;
};

const subscribe = (callback) => {
    emitter.on("message", callback);
};

const getHistory = async (chatId) => {
    const chat = await Chat.findById(chatId);
    return chat.messages;
};

module.exports = {
    find,
    sendMessage,
    subscribe,
    getHistory,
};