const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        spelling: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Spelling = mongoose.model("spelling", schema);
module.exports = Spelling;
