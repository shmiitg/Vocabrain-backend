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
                synonyms: [String],
                antonyms: [String],
                example: String,
            },
        ],
    },
    { timestamps: true }
);

const Word = mongoose.model("word", schema);
module.exports = Word;
