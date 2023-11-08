const pool = require('../db/connection');

const getAllCleaningTasks = async () => {
   try{
        const result = await pool.query('SELECT * FROM cleaningtasks')
        return result.rows;
    } catch (err) {
        throw err;
    }
}

const deleteCleaningTask = async (taskid) => {
    try {
        const query = 'DELETE FROM cleaningtasks WHERE taskid = $1';
        const result = await pool.query(query, [taskid]);
        return result;
    } catch (error) {
        throw error;
    }
};

const addCleaningTask = async (roommateId, task) => {
    try {
      const query = 'INSERT INTO cleaningtasks (roommateid, task) VALUES ($1, $2)';
      const result = await pool.query(query, [roommateId, task]);
      return result;
    } catch (error) {
      throw error;
    }
  };
  
  module.exports = {
    addCleaningTask,
  };

module.exports = {
    getAllCleaningTasks,
    addCleaningTask,
    deleteCleaningTask
}