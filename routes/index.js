const express = require("express");
const router = express.Router();
const Word = require("../models/word");
// const fs = require("fs");
// const path = require("path");

router.get("/", async (req, res) => {
    try {
        const words = await Word.find();
        res.status(200).json({ words: words });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.get("/:word", async (req, res) => {
    try {
        const word = req.params.word;
        const wordDetails = await Word.findOne({ word: { $regex: new RegExp(`^${word}$`, "i") } });
        if (!wordDetails) {
            return res.status(404).send({ error: "Word not found" });
        }
        res.status(200).json({ word: wordDetails });
    } catch (error) {
        res.status(500).send({ error: "Server error" });
    }
});

router.post("/save", async (req, res) => {
    try {
        const { word, meanings } = req.body;
        if (!word || !meanings) {
            return res.status(422).json({ error: "All fields are required" });
        }
        const new_word = new Word({ word, meanings });
        await new_word.save();
        res.status(200).json({ message: "Word added" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedWord = req.body;
    try {
        const word = await Word.findByIdAndUpdate(id, updatedWord, {
            new: true,
            runValidators: true,
        });
        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }
        res.status(200).json({ message: "Word edited" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const word = await Word.findByIdAndDelete(id);
        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }
        res.status(200).json({ message: "Word deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
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
