const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Word = require("../models/word");
const auth = require("../middleware/auth");

// Add to favorites
router.post("/favorites/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        const word = await Word.findById(req.params.id);

        if (!word) {
            return res.status(404).json({ msg: "Word not found" });
        }

        if (user.favorites.includes(req.params.id)) {
            return res.status(400).json({ msg: "Word already in favorites" });
        }
        user.favorites.push(req.params.id);
        await user.save();

        res.status(200).json({ favorites: user.favorites, msg: "Word added successfully" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Remove from favorites
router.delete("/favorites/:id", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user.favorites.includes(req.params.id)) {
            return res.status(400).json({ msg: "Word not in favorites" });
        }

        user.favorites = user.favorites.filter((fav) => fav.toString() !== req.params.id);

        await user.save();

        res.json({ favorites: user.favorites, msg: "Word removed successfully" });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

// Get favorites
router.get("/favorites", auth, async (req, res) => {
    try {
        const user = await User.findById(req.userId).populate("favorites");
        res.json({ favorites: user.favorites });
    } catch (err) {
        res.status(500).send("Server Error");
    }
});

module.exports = router;
