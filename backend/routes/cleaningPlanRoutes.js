const express = require('express');
const { getAllCleaningTasks, addCleaningTask, deleteCleaningTask } = require('../services/cleaningPlanService');
const router = express.Router();

router.get(
    '/getAllCleaningTasks',
    async (req, res) => {
        try {
            const cleaningtasks = await getAllCleaningTasks();
            res.json(cleaningtasks);
        } catch (err) {
            res.status(500).json({ error: err.message })
        }
    }
)

router.get('/deleteCleaningTask/:taskID', async (req, res) => {
    const taskid = parseInt(req.params.taskID);
    try {
        const result = await deleteCleaningTask(taskid);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Task not found.' });
        }
        res.json({ message: 'Task successfully deleted.' });
    } catch (err) {
        console.error('Error while deleting task:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

router.post('/addCleaningTask', async (req, res) => {
    const { roommateId, task } = req.body;
    try {
        const result = await addCleaningTask(roommateId, task);
        res.json({ message: 'Task successfully added.' });
    } catch (err) {
        console.error('Error while adding task:', err);
        res.status(500).json({ error: err.message, stack: err.stack });
    }
});

module.exports = router