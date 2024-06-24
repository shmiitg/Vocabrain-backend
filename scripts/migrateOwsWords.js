const OWS = require("../models/ows");
const OWS1 = require("../models/ows1");

const migrateOwsWords = async () => {
    try {
        const allOWS = await OWS.find();
        for (const ows of allOWS) {
            // Log the entire document for debugging purposes
            // console.log(`Processing OWS with ID: ${ows._id}`);

            if (
                ows.word &&
                Array.isArray(ows.word) &&
                ows.meanings &&
                Array.isArray(ows.meanings)
            ) {
                // Map the current structure to the new structure
                const newOws = ows.word.map((word, index) => ({
                    word: word,
                    definition: ows.meanings[index] ? ows.meanings[index].definition : "",
                    example: ows.meanings[index] ? ows.meanings[index].example : "",
                }));

                const ows1 = new OWS1({ ows: newOws });
                await ows1.save();
                console.log(`Successfully updated OWS with ID: ${ows._id}`);
            } else {
                console.error(`OWS with ID: ${ows._id} has invalid data structure.`);
                console.error(`Word: ${ows.word}, Meanings: ${ows.meanings}`);
                console.error(`Full Document: ${JSON.stringify(ows, null, 2)}`);
            }
        }
        console.log("Migration complete");
    } catch (error) {
        console.error("Migration failed:", error);
    }
};

// migrateOwsWords();

module.exports = migrateOwsWords;
