const { Chat } = require("../../chat");

const register = (io, socket) => {
    const user = socket.request.user;
    // const user = { id: "65f197257f912f83b1c98185" };

    Chat.subscribe((data) => {
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