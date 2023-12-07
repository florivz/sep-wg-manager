const pool = require('../db/connection');

/**
 * Retrieves all expenses for a specific user from the database.
 *
 * @param {string} username - The username of the user whose expenses are retrieved.
 * @returns {Promise<Array>} Array of expense objects.
 * @throws {Error} If there's an issue with the database query.
 */
const getExpenses = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM expenses WHERE username = $1', [username]);
        return result.rows;
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error fetching expenses: ${err.message}`);
    }
};

/**
 * Creates a new expense entry in the database.
 *
 * @param {number} roommateid - The ID of the roommate who incurred the expense.
 * @param {number} amount - The expense amount.
 * @param {string} description - The description of the expense.
 * @param {string} username - The username of the user who added the expense.
 * @returns {Promise<Object>} The added expense object.
 * @throws {Error} If there's an issue with the database query.
 */
const postExpense = async (roommateid, amount, description, username) => {
    try {
        const result = await pool.query('INSERT INTO expenses (roommateid, amount, description, username) VALUES ($1, $2, $3, $4) RETURNING *', [roommateid, amount, description, username]);
        return result.rows[0];
    } catch (err) {
        // Handle errors by sending an appropriate response
        throw new Error(`Error creating new expense: ${err.message}`);
    }
};

/**
 * Deletes an expense entry from the database by ID.
 *
 * @param {number} id - The ID of the expense to be deleted.
 * @returns {Promise<boolean>} True if a row was deleted, otherwise false.
 * @throws {Error} If there's an issue with the database query.
 */
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
    getExpenses,
    postExpense,
    deleteExpense
};
