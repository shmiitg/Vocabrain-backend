const OWS = require("../models/ows");

const migrateOwsWords = async () => {
    try {
        const owsDocuments = await OWS.find();

        console.log(`Found ${owsDocuments.length} documents`);

        for (const doc of owsDocuments) {
            if (typeof doc.word === "string") {
                console.log(`Updating document with word: ${doc.word}`);
                doc.word = [doc.word]; // Convert the string to an array with one element
                await doc.save();
                console.log(`Updated document: ${doc}`);
            } else if (Array.isArray(doc.word)) {
                console.log(`Document already has word as array: ${doc.word}`);
            } else {
                console.log(
                    `Unexpected type for word field: ${typeof doc.word} in document: ${doc}`
                );
            }
        }

        console.log("Migration complete.");
    } catch (err) {
        console.error("Error during migration:", err);
    }
};

module.exports = migrateOwsWords;
