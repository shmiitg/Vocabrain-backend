const express = require("express");
const router = express.Router();
const Spelling = require("../models/spelling");

router.get("/", async (req, res) => {
    try {
        const spellings = await Spelling.find();
        res.status(200).json({ spellings: spellings });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/save", async (req, res) => {
    try {
        const { spelling } = req.body;
        if (!spelling) {
            return res.status(422).json({ error: "All fields are required" });
        }
        const new_spelling = new Spelling({ spelling });
        await new_spelling.save();
        res.status(200).json({ message: "Spelling added" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedSpelling = req.body;
    try {
        const spelling = await Spelling.findByIdAndUpdate(id, updatedSpelling, {
            new: true,
            runValidators: true,
        });
        if (!spelling) {
            return res.status(404).json({ error: "Spelling not found" });
        }
        res.status(200).json({ message: "Spelling edited" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const spelling = await Spelling.findByIdAndDelete(id);
        if (!spelling) {
            return res.status(404).json({ error: "Spelling not found" });
        }
        res.status(200).json({ message: "Spelling deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
