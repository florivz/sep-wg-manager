const pool = require('../db/connection');

/**
 * Retrieve all cleaning tasks from the database.
 * @param {number} taskId - The ID of the user to get user specific tasks.
 * @param {string} username - A cleaning is bound to a shared apartment
 * @returns {Promise<Array>} An array of cleaning tasks.
 * @throws {Error} If there's an issue with the database query.
 */
const getCleaningTasks = async (username) => {
    try {
        const result = await pool.query('SELECT * FROM cleaningtasks WHERE username = $1', [username]);
        return result.rows;
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a cleaning task from the database by task ID.
 * @param {number} taskId - The ID of the cleaning task to delete.
 * @returns {Promise<Object>} The result of the delete operation.
 * @throws {Error} If there's an issue with the database query.
 */
const deleteCleaningTask = async (taskId) => {
    try {
        const query = 'DELETE FROM cleaningtasks WHERE taskid = $1';
        const result = await pool.query(query, [taskId]);
        return result;
    } catch (error) {
        throw error;
    }
};

/**
 * Add a new cleaning task to the database.
 * @param {string} task - The description of the cleaning task.
 * @param {number} roommateId - The ID of the roommate responsible for the task.
 * @param {string} username - The ID of the shared apartment responsible for the task.
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there's an issue with the database query.
 */
const postCleaningTask = async (task, roommateId, username) => {
    try {
        const query = 'INSERT INTO cleaningtasks (task, roommateid, username) VALUES ($1, $2, $3)';
        const result = await pool.query(query, [task, roommateId, username]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getCleaningTasks,
    postCleaningTask,
    deleteCleaningTask
};
