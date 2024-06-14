const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        word: {
            type: String,
            required: true,
        },
        meanings: [
            {
                definition: String,
                example: String,
            },
        ],
    },
    { timestamps: true }
);

const OWS = mongoose.model("ows", schema);
module.exports = OWS;
