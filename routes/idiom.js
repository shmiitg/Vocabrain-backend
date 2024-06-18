const express = require("express");
const router = express.Router();
const Idiom = require("../models/idiom");

// Get all idioms
router.get("/", async (req, res) => {
    try {
        const idioms = await Idiom.find();
        res.status(200).json({ idioms: idioms });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Add a new idiom
router.post("/save", async (req, res) => {
    try {
        const { idiom, meaning, example, type } = req.body;
        if (!idiom || !meaning) {
            return res.status(422).json({ error: "Idiom and meaning are required" });
        }
        const new_idiom = new Idiom({ idiom, meaning, example, type });
        await new_idiom.save();
        res.status(200).json({ message: "Idiom added" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Edit an existing idiom
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedIdiom = req.body;
    try {
        const idiom = await Idiom.findByIdAndUpdate(id, updatedIdiom, {
            new: true,
            runValidators: true,
        });
        if (!idiom) {
            return res.status(404).json({ error: "Idiom not found" });
        }
        res.status(200).json({ message: "Idiom edited" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

// Delete an idiom
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const idiom = await Idiom.findByIdAndDelete(id);
        if (!idiom) {
            return res.status(404).json({ error: "Idiom not found" });
        }
        res.status(200).json({ message: "Idiom deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
