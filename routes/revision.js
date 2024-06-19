const express = require("express");
const router = express.Router();
const Word = require("../models/word");
const Idiom = require("../models/idiom");
const OWS = require("../models/ows");

// Utility function to get random elements from an array
const getRandomElements = (array, count) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

router.get("/", async (req, res) => {
    try {
        const words = await Word.find();
        const idioms = await Idiom.find();
        const ows = await OWS.find();

        const randomWords = getRandomElements(words, 10);
        const randomIdioms = getRandomElements(idioms, 5);
        const randomOWS = getRandomElements(ows, 5);

        res.status(200).json({
            words: randomWords,
            idioms: randomIdioms,
            ows: randomOWS,
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
