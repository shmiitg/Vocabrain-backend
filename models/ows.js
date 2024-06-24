const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        ows: [
            {
                word: {
                    type: String,
                    required: true,
                },
                definition: String,
                example: String,
            },
        ],
    },
    { timestamps: true }
);

const OWS = mongoose.model("ows", schema);
module.exports = OWS;
