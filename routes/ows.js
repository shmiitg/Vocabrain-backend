const express = require("express");
const router = express.Router();
const OWS = require("../models/ows");

router.get("/", async (req, res) => {
    try {
        const ows = await OWS.find();
        res.status(200).json({ ows });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.post("/save", async (req, res) => {
    try {
        const { ows } = req.body;
        if (!ows) {
            return res.status(422).json({ error: "All fields are required" });
        }
        const new_word = new OWS({ ows });
        await new_word.save();
        res.status(201).json({ message: "Word added" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedWord = req.body;
    try {
        const word = await OWS.findByIdAndUpdate(id, updatedWord, {
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
        const word = await OWS.findByIdAndDelete(id);
        if (!word) {
            return res.status(404).json({ error: "Word not found" });
        }
        res.status(200).json({ message: "Word deleted" });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
