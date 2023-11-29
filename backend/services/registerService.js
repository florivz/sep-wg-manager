const pool = require('../db/connection');

const addUser = async (username, password, email) => {
    if (username.length > 3 && password.length > 5) {
        try {
            const query = "INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *";
            const result = await pool.query(query, [username, password, email]);
            if (result.rowCount > 0) {
                const user = result.rows[0];
                return user;
            } else {
                throw new Error('User could not be added');
            }
        } catch (error) {
            throw error;
        }
    } else {
        throw new Error('Username or password too short');
    }
}

module.exports = { addUser };
