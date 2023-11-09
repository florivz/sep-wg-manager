const express = require('express');
const { getAllRoommates, addNewRoommate, deleteRoommate } = require('../services/roommatesService');
const router = express.Router();

router.get(
    '/getAllRoommates', 
    async (req, res) => {
    try {
        const roommates = await getAllRoommates();
        res.json(roommates);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post(
    '/addNewRoommate',
    async (req, res) => {
        const { firstname, lastname, email } = req.body;
        try{
            const result = await addNewRoommate(firstname, lastname, email);
            res.status(200).json({success: true, message: 'Roommate added successfully'});
        } catch (error) {
            res.status(500).json({ success: false, message: 'Roommate could not be added'});
        }
    }
);

router.delete(
    '/deleteRoommate/:id',
    async (req, res) => {
        const id = req.params.id
        try {
            console.log("Router: ", id)
            const result = await deleteRoommate(id);
            res.status(200).json({success: true, message: `Roommate with ID: ${id} is deleted.`});
        } catch (err) {
            res.status(500).json({success: false, message: 'Failed to delete roommate'});
        }
    }
)

module.exports = router;
