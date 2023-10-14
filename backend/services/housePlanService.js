const pool = require('../db/connection')

const getAllDebts = async () => {
    try{
        const result = await pool.query('SELECT * FROM debts');
        return result.rows;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllDebts
}