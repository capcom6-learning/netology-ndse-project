const mongoose = require("mongoose");
const { Schema } = mongoose;

const AdvertisementSchema = new Schema({
    shortText: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    images: {
        type: [String],
        required: false,
    },
    userId: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: false,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
});

const Advertisement = mongoose.model("Advertisement", AdvertisementSchema);

module.exports = { Advertisement };