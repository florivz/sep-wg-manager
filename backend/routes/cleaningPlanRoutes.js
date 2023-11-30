const express = require('express');
const { getAllCleaningTasks, addCleaningTask, deleteCleaningTask } = require('../services/cleaningPlanService');
const router = express.Router();

// Route to get all cleaning tasks
router.get('/cleaning-tasks', async (req, res) => {
    try {
        const cleaningTasks = await getAllCleaningTasks();
        res.json(cleaningTasks);
    } catch (err) {
        console.error('Error while fetching cleaning tasks:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

// Route to delete a cleaning task by taskID
router.delete('/cleaning-tasks/:taskID', async (req, res) => {
    const taskId = parseInt(req.params.taskID);
    try {
        const result = await deleteCleaningTask(taskId);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json({ message: 'Task successfully deleted.' });
    } catch (err) {
        console.error('Error while deleting task:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

// Route to add a new cleaning task
router.post('/cleaning-tasks', async (req, res) => {
    const {task, roommateId} = req.body;
    try {
        const result = await addCleaningTask(task, roommateId);
        res.json({ message: 'Task successfully added.' });
    } catch (err) {
        console.error('Error while adding task:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

module.exports = router;
