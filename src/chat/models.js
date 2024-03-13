const mongoose = require("mongoose");
const { Schema } = mongoose;

/*
Модель данных чата Chat должна содержать следующие поля:

Название	Тип	Обязательное	Уникальное
_id	ObjectId	да	да
users	[ObjectId, ObjectId]	да	нет
createdAt	Date	да	нет
messages	Message[]	нет	нет
Модель сообщения Message должна содержать следующие поля:

Название	Тип	Обязательное	Уникальное
_id	ObjectId	да	да
author	ObjectId	да	нет
sentAt	Date	да	нет
text	string	да	нет
readAt	Date	нет	нет

 */

const MessageSchema = new Schema(
    {
        author: {
            type: mongoose.Types.ObjectId,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        readAt: {
            type: Date,
            required: false,
        },
    },
    {
        timestamps: { createdAt: "sentAt", updatedAt: null }
    }
);

const ChatSchema = new Schema(
    {
        users: {
            type: [mongoose.Types.ObjectId, mongoose.Types.ObjectId],
            unique: true,
            required: true,
        },
        messages: {
            type: [MessageSchema],
            required: false,
        },
    },
    {
        timestamps: { createdAt: "createdAt", updatedAt: null },
    }
);

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = { Chat }