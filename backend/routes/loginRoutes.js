const express = require('express');
const { loginService } = require('../services/loginService');
const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await loginService(username, password);

        if (user) {
            res.json({ success: true, message: 'Anmeldung erfolgreich', user });
        } else {
            res.status(401).json({ success: false, message: 'Anmeldung fehlgeschlagen' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
