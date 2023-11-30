const pool = require('../db/connection');

// Get all debts from the database
const getAllDebts = async () => {
    try {
        const result = await pool.query('SELECT * FROM debts');
        return result.rows;
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error fetching debts: ${err.message}`);
    }
};

// Get all expenses from the database
const getAllExpenses = async () => {
    try {
        const result = await pool.query('SELECT * FROM expenses');
        return result.rows;
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error fetching expenses: ${err.message}`);
    }
};

// Create a new debt entry in the database
const postNewDebt = async (deptid, expenseid, debtor_roommateid, amount_owned) => {
    try {
        const result = await pool.query('INSERT INTO debts (deptid, expenseid, debtor_roommateid, amount_owned) VALUES ($1, $2, $3, $4)', [deptid, expenseid, debtor_roommateid, amount_owned]);
        return result.rows[0];
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error creating new debt: ${err.message}`);
    }
};

// Create a new expense entry in the database
const postNewExpense = async (roommateid, amount, description) => {
    try {
        const result = await pool.query('INSERT INTO expenses (roommateid, amount, description) VALUES ($1, $2, $3)', [roommateid, amount, description]);
        return result.rows[0];
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error creating new expense: ${err.message}`);
    }
};

// Delete an expense entry from the database by ID
const deleteExpense = async (id) => {
    try {
        const result = await pool.query('DELETE FROM expenses WHERE expenseid = $1', [id]);
        return result.rowCount > 0; // Return true if a row was deleted
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error deleting expense: ${err.message}`);
    }
};

module.exports = {
    getAllDebts,
    getAllExpenses,
    postNewDebt,
    postNewExpense,
    deleteExpense
};
