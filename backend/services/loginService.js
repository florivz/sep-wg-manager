const pool = require('../db/connection');
const bcrypt = require('bcrypt');

// Service function for user login
const loginService = async (username, plaintextPassword) => {
    try {
        // Query to select user by username
        const query = "SELECT username, password FROM users WHERE username = $1";
        const result = await pool.query(query, [username]);

        // Check if a user with the given username exists
        if (result.rows.length > 0) {
            const user = result.rows[0];

            // Compare the provided plaintext password with the stored hashed password
            const passwordMatch = await bcrypt.compare(plaintextPassword, user.password);

            // If the passwords match, return the user
            if (passwordMatch) {
                return user;
            } else {
                // Password does not match, throw an error
                throw new Error('Password does not match');
            }
        } else {
            // User not found, throw an error
            throw new Error('User not found');
        }
    } catch (error) {
        // Handle and rethrow any caught errors for better error reporting
        throw error;
    }
}

module.exports = { loginService };
