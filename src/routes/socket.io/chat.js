const { Chat } = require("../../chat");

const register = (io, socket) => {
    const user = socket.request.user;
    console.log(user);

    Chat.subscribe((data) => {
        const users = data.users;

        if (!users.includes(user.id)) {
            return;
        }

        socket.emit("newMessage", data.message);
    });

    socket.on("getHistory", async (userId) => {
        const chat = await Chat.find([userId, user.id]);
        const history = chat ? chat.messages : [];
        socket.emit("chatHistory", history);
    });

    socket.on("sendMessage", async (data) => {
        await Chat.sendMessage({ ...data, author: user.id });
    });
};

module.exports = {
    register,
}