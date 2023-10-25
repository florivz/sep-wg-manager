const pool = require('../db/connection');

const loginService = async (username, password) => {
    try {
        const query = "SELECT username, password FROM users WHERE username = $1 AND password = $2";
        const result = await pool.query(query, [username, password]);
        return result.rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {loginService};
