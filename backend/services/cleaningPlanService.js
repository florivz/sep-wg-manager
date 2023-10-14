const pool = require('../db/connection');

const getAllCleaningTasks = async () => {
   try{
        const result = await pool.query('SELECT * FROM cleaningtasks')
        return result.rows;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAllCleaningTasks
}