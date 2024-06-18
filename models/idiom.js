const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        idiom: {
            type: String,
            required: true,
        },
        meaning: String,
        example: String,
        type: {
            type: String,
            default: "General",
        },
    },
    { timestamps: true }
);

const Idiom = mongoose.model("Idiom", schema);
module.exports = Idiom;
