const express = require("express");
const router = express.Router();
const Word = require("../models/word");
// const fs = require("fs");
// const path = require("path");

router.get("/words", async (req, res) => {
    try {
        const words = await Word.find();
        res.status(200).json({ words: words });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/words/save", async (req, res) => {
    try {
        const { word, meanings } = req.body;
        if (!word || !meanings) {
            return res.status(422).json({ error: "All fields are required" });
        }
        const new_word = new Word({ word, meanings });
        await new_word.save();
        res.status(200).json({ message: "Word added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/words/delete/:id", async (req, res) => {
    try {
        const word = await Word.findById(req.params.id);
        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }
        await word.remove();
        res.status(200).json({ message: "Word deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read JSON file
// const jsonData = fs.readFileSync(path.join(__dirname, "../data.json"), "utf-8");
// const words = JSON.parse(jsonData).words;

// Insert words into MongoDB
// const importWords = async () => {
//     try {
//         await Word.insertMany(words);
//         console.log("Words imported successfully!");
//     } catch (err) {
//         console.error("Error importing words:", err);
//     }
// };

// importWords();

module.exports = router;
