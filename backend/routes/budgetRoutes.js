const express = require('express');
const {
  getExpenses,
  postExpense,
  deleteExpense,
} = require('../services/budgetService');
const router = express.Router();

// Route to get all expenses
router.get('/expenses/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const expenses = await getExpenses(username);
    res.json(expenses);
  } catch (error) {
    // Handle the error and send an appropriate response to the client
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// Route to post a new expense
router.post('/expenses', async (req, res) => {
  const { roommateid, amount, description, username } = req.body;
  try {
    const expense = await postExpense(roommateid, amount, description, username);
    res.json(expense);
  } catch (error) {
    // Handle the error and send an appropriate response to the client
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

// Route to delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const expenseDeleted = await deleteExpense(id);
    if (expenseDeleted) {
      res.json({ message: 'Expense deleted successfully' });
    } else {
      res.status(404).json({ error: 'Expense not found' });
    }
  } catch (error) {
    // Handle the error and send an appropriate response to the client
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

module.exports = router;
