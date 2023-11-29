const pool = require('../db/connection');
const bcrypt = require('bcrypt')

const loginService = async (username, plaintextPassword) => {
    try {
        const query = "SELECT username, password FROM users WHERE username = $1";
        const result = await pool.query(query, [username]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            const passwordMatch = await bcrypt.compare(plaintextPassword, user.password);
            if (passwordMatch) {
                return user;
            } else {
                throw new Error('Passwort stimmt nicht überein');
            }
        } else {
            throw new Error('Benutzer nicht gefunden');
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { loginService };
