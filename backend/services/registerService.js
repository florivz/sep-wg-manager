const pool = require('../db/connection');

/**
 * Adds a new user to the database.
 * @param {string} username - The username for the new user.
 * @param {string} password - The password for the new user.
 * @param {string} email - The email address for the new user.
 * @returns {Promise<Object>} - The newly added user object.
 * @throws {Error} - If username or password is too short or if the user could not be added.
 */
const addUser = async (username, password, email) => {
    try {
        // Check if username and password meet minimum length requirements.
        if (username.length > 3 && password.length > 5) {
            const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
            const result = await pool.query(query, [username, password, email]);

            // Check if the user was successfully added to the database.
            if (result.rowCount > 0) {
                const user = result.rows[0];
                return user;
            } else {
                throw new Error('User could not be added');
            }
        } else {
            throw new Error('Username or password too short');
        }
    } catch (error) {
        // Handle and rethrow any errors that occur during the process.
        throw error;
    }
}

module.exports = { addUser };
