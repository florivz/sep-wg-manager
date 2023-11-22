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

const addCleaningTask = async (task, roommateid) => {
    try {
      const query = 'INSERT INTO cleaningtasks (task, roommateid) VALUES ($1, $2)';
      const result = await pool.query(query, [task, roommateid]);
      return result;
    } catch (error) {
      throw error;
    }
  };

module.exports = {
    getAllCleaningTasks,
    addCleaningTask,
    deleteCleaningTask
}