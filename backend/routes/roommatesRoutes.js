const express = require('express');
const { getAllRoommates, addNewRoommate, deleteRoommate, getRoommateById } = require('../services/roommatesService');
const router = express.Router();

router.get(
    '/roommates',
    async (req, res) => {
        try {
            const roommates = await getAllRoommates();
            res.json(roommates);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });

router.get(
    '/roommates/:id',
    async (req, res) => {
        const roommateid = parseInt(req.params.id);
        try {
            const roommate = await getRoommateById(roommateid);
            res.json(roommate);
        } catch (error) {
            throw error;
        }
    }
)

router.post(
    '/roommates',
    async (req, res) => {
        const { firstname, lastname, email } = req.body;
        try {
            const result = await addNewRoommate(firstname, lastname, email);
            res.status(200).json({ success: true, message: 'Roommate added successfully' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Roommate could not be added' });
        }
    }
);

router.delete(
    '/roommates/:id',
    async (req, res) => {
        const id = req.params.id
        try {
            const result = await deleteRoommate(id);
            res.status(200).json({ success: true, message: `Roommate with ID: ${id} is deleted.` });
        } catch (err) {
            res.status(500).json({ success: false, message: 'Failed to delete roommate' });
        }
    }
)

module.exports = router;
