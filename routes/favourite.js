const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user");
const Word = require("../models/word");

router.post("/:wordId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const word = await Word.findById(req.params.wordId);

        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }

        if (user.favorites.includes(word._id)) {
            return res.status(400).json({ error: "Word already in favorites" });
        }

        user.favorites.push(word._id);
        await user.save();

        res.status(200).json({ message: "Word added to favorites" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:wordId", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        const word = await Word.findById(req.params.wordId);

        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }

        user.favorites = user.favorites.filter((favorite) => !favorite.equals(word._id));
        await user.save();

        res.status(200).json({ message: "Word removed from favorites" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
