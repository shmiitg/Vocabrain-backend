const express = require("express");
const router = express.Router();
const Visit = require("../models/visit");

router.get("/", async (req, res) => {
    try {
        let visit = await Visit.findOne();
        if (!visit) {
            visit = new Visit();
            await visit.save();
        }
        visit.count += 1;
        await visit.save();
        res.status(200).json({ count: visit.count });
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
