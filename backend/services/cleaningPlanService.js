const pool = require('../db/connection');

const getAllCleaningTasks = async () => {
   try{
        const result = await pool.query('SELECT * FROM cleaningtasks')
        return result.rows;
    } catch (err) {
        throw err;
    }
}

const createNewCleaningTask = async () => {
    try{
        const result = await pool.query('INSERT * INTO claeningtasks')
    } catch(err) {
        throw err;
    }
}

const deleteCleaningTask = async (taskId) => {
    try {
        const result = await pool.query('DELETE FROM cleaningtasks WHERE task_id = $1', [TaskId]);
        return result;
    } catch (err) {
        throw err;
    }
}

// Example usage:
try {
    const taskIdToDelete = 123; // Replace with the actual task ID you want to delete.
    const deletedTask = await deleteCleaningTask(taskIdToDelete);
    console.log('Cleaning Task deleted:', deletedTask);
} catch (err) {
    console.error('Error deleting Cleaning Task:', err);
}


module.exports = {
    getAllCleaningTasks
}