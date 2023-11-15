const express = require('express')
const { getAllDebts, getAllExpenses, postNewDebt, postNewExpense } = require('../services/housePlanService')
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

router.get(
    '/getAllExpenses', async (req, res) => {
        try {
            const exepenses = await getAllExpenses();
            res.json(exepenses);
        } catch (err) {
            throw err;
        }
    }
)

router.post(
    '/postNewExpense', async (req, res) => {
        const {roommateid, amount, description } = req.body;
        try {
            const expense = await postNewExpense(roommateid, amount, description);
            res.json(expense);
        } catch (err) {
            throw err;
        }
    }
)

module.exports = router;