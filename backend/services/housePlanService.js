const pool = require('../db/connection')

const getAllDebts = async () => {
    try {
        const result = await pool.query('SELECT * FROM debts');
        return result.rows;
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllExpenses = async () => {
    try {
        const result = await pool.query('SELECT * FROM expenses');
        return result.rows;
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

const postNewDebt = async (deptid, expenseid, debtor_roommateid, amount_owned) => {
    try {
        const result = await pool.query('INSERT INTO debts (deptid, expenseid, debtor_roommateid, amount_owned) VALUES ($1, $2, $3, $4)', [deptid, expenseid, debtor_roommateid, amount_owned]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const postNewExpense = async (roommateid, amount, description) => {
    roommateid = parseInt(roommateid);
    try {
        const result = await pool.query('INSERT INTO expenses (roommateid, amount, description) VALUES ($1, $2, $3)', [roommateid, amount, description]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getAllDebts,
    getAllExpenses,
    postNewDebt,
    postNewExpense
}