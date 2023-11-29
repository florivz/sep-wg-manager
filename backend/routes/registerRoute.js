const express = require('express');
const { addUser } = require('../services/registerService');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post(
    '/user',
    async (req, res) => {
        const { username, password, email } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        try {
            const user = await addUser(username, hashedPassword, email);
            res.status(200).json({ success: true, message: 'Nutzer erfolgreich hinzugefügt', user });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Nutzername oder Passwort zu kurz', error: error.message });
        }
    }
);

module.exports = router;
