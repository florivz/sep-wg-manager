const express = require('express');
const { getAllRoommates } = require('../services/roommatesService');
const router = express.Router();

router.get('/getAllRoommates', async (req, res) => {
    try {
        const roommates = await getAllRoommates();
        res.json(roommates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
