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

const OWS1 = mongoose.model("ows1", schema);
module.exports = OWS1;
