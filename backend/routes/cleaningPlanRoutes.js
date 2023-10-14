const express = require('express');
const { getAllCleaningTasks } = require('../services/cleaningPlanService');
const router = express.Router();

router.get(
    '/getAllCleaningTasks',
    async (req, res) => {
        try {
            const cleaningtasks = await getAllCleaningTasks();
            res.json(cleaningtasks);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
)

module.exports = router