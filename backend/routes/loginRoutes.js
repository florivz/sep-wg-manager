const express = require('express');
const { loginService } = require('../services/loginService');
const router = express.Router();

router.get(
    '/login', async (req, res) => {
        try {
            const { username, password } = req.query;
            const result = await loginService(username, password);

            if (result.length > 0) {
                res.json({ success: true, message: 'Anmeldung erfolgreich' });
            } else {
                res.status(401).json({ success: false, message: 'Anmeldung fehlgeschlagen' });
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
);

module.exports = router;
