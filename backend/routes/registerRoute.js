const express = require('express');
const { addUser, checkUsernameExists } = require('../services/registerService');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Endpoint to check if user already exists
router.get('/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const exists = await checkUsernameExists(username);
        res.status(200).json({ exists });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/user', async (req, res) => {
    try {
        // Extract username, password, and email from the request body
        const { username, password, email } = req.body;

        // Check length of username and password
        if (username.length <= 3 || username.length >= 20) {
            res.status(400).json({ success: false, message: 'Benutzername muss zwischen 4 und 19 Zeichen lang sein.' });
            return;
        }

        if (password.length <= 5 || password.length >= 20) {
            res.status(400).json({ success: false, message: 'Passwort muss zwischen 6 und 19 Zeichen lang sein.' });
            return;
        }

        // Hash the password using bcrypt with a salt
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Try to add the user to the database
        const user = await addUser(username, hashedPassword, email);

        // If user creation is successful, respond with a success message and the user data
        res.status(200).json({ success: true, message: 'Benutzer erfolgreich hinzugefügt', user });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(500).json({ success: false, message: 'Benutzer konnte nicht hinzugefügt werden', error: error.message });
    }
});

module.exports = router;
