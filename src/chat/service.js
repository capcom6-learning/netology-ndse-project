const { EventEmitter } = require("events");

const { Chat } = require("./models");

const emitter = new EventEmitter();

const findOrCreate = async (users) => {
    return await Chat.findOne({ users: { $all: users } })
        || await Chat.create({ users });
};

const sendMessage = async ({ author, receiver, text }) => {
    const chat = await findOrCreate([author, receiver]);

    const message = chat.messages.create({ author, text });
    chat.messages.push(message);
    await chat.save();

    emitter.emit("message", { chatId: chat._id, users: chat.users, message });

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
    find: findOrCreate,
    sendMessage,
    subscribe,
    getHistory,
};