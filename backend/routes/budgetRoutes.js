const express = require('express');
const {
  getAllDebts,
  getAllExpenses,
  postNewDebt,
  postNewExpense,
  deleteExpense,
} = require('../services/budgetService');
const router = express.Router();

// Route to get all debts
router.get('/debts', async (req, res) => {
  try {
    const debts = await getAllDebts();
    res.json(debts);
  } catch (error) {
    // Handle errors gracefully and provide a meaningful response
    res.status(500).json({ error: error.message });
  }
});

// Route to get all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await getAllExpenses();
    res.json(expenses);
  } catch (error) {
    // Throw the error, as there is no specific handling here
    throw error;
  }
});

// Route to post a new expense
router.post('/expenses', async (req, res) => {
  const { roommateid, amount, description } = req.body;
  try {
    const expense = await postNewExpense(roommateid, amount, description);
    res.json(expense);
  } catch (error) {
    // Throw the error, as there is no specific handling here
    throw error;
  }
});

// Route to delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const expense = await deleteExpense(id);
    res.json(expense);
  } catch (error) {
    // Throw the error, as there is no specific handling here
    throw error;
  }
});

module.exports = router;
