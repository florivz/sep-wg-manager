const pool = require('../db/connection');

/**
 * Retrieve all cleaning tasks from the database.
 * @returns {Promise<Array>} An array of cleaning tasks.
 * @throws {Error} If there's an issue with the database query.
 */
const getAllCleaningTasks = async () => {
    try {
        const result = await pool.query('SELECT * FROM cleaningtasks');
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
 * @returns {Promise<Object>} The result of the insert operation.
 * @throws {Error} If there's an issue with the database query.
 */
const addCleaningTask = async (task, roommateId) => {
    try {
        const query = 'INSERT INTO cleaningtasks (task, roommateid) VALUES ($1, $2)';
        const result = await pool.query(query, [task, roommateId]);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getAllCleaningTasks,
    addCleaningTask,
    deleteCleaningTask
};
