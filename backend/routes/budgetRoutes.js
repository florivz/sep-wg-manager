const express = require('express')
const { getAllDebts, getAllExpenses, postNewDebt, postNewExpense } = require('../services/budgetService')
const router = express.Router();

router.get(
    '/debts', async (req, res) => {
        try {
            const debts = await getAllDebts();
            res.json(debts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

router.get(
    '/expenses', async (req, res) => {
        try {
            const exepenses = await getAllExpenses();
            res.json(exepenses);
        } catch (err) {
            throw err;
        }
    }
)

router.post(
    '/debts', async (req, res) => {
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