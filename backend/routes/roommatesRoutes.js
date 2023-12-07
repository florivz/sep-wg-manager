const express = require('express');
const router = express.Router();
const {
  getRoommates,
  postRoommate,
  deleteRoommate,
  getRoommateById,
} = require('../services/roommatesService');

// Handle GET request for all roommates
router.get('/roommates/:username', async (req, res) => {
  const { username } = req.params
  try {
    const roommates = await getRoommates(username);
    res.json(roommates);
  } catch (error) {
    // Handle errors with a 500 Internal Server Error response
    res.status(500).json({ error: 'Failed to retrieve roommates' });
  }
});

// Handle GET request for a specific roommate by ID
router.get('/roommates/:id', async (req, res) => {
  const roommateId = parseInt(req.params.id);
  try {
    const roommate = await getRoommateById(roommateId);
    res.json(roommate);
  } catch (error) {
    // Re-throw the error to be handled globally if necessary
    throw error;
  }
});

// Handle POST request to add a new roommate
router.post('/roommates', async (req, res) => {
  const { firstname, lastname, email, username } = req.body;
  try {
    const result = await postRoommate(firstname, lastname, email, username);
    res.status(201).json({ success: true, message: 'Roommate added successfully' });
  } catch (error) {
    // Handle errors with a 500 Internal Server Error response
    res.status(500).json({ success: false, message: 'Failed to add roommate' });
  }
});

// Handle DELETE request to delete a roommate by ID
router.delete('/roommates/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await deleteRoommate(id);
    res.status(200).json({ success: true, message: `Roommate with ID: ${id} is deleted.` });
  } catch (error) {
    // Handle errors with a 500 Internal Server Error response
    res.status(500).json({ success: false, message: 'Failed to delete roommate' });
  }
});

module.exports = router;
