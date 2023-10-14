const express = require('express')
const { getAllDebts } = require('../services/housePlanService')
const router = express.Router();

router.get(
    '/getAllDebts', async (req, res) => {
        try {
            const debts = await getAllDebts();
            res.json(debts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;