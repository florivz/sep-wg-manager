const express = require('express');
const { loginService } = require('../services/loginService');
const router = express.Router();

// Route for user login
router.post('/login', async (req, res) => {
    try {
        // Extract username and password from request body
        const { username, password } = req.body;

        // Call the loginService to authenticate the user
        const user = await loginService(username, password);

        // Check if authentication was successful
        if (user) {
            // Respond with a success message and user data
            res.json({ success: true, message: 'Login successful', user });
        } else {
            // Respond with a 401 status code for failed login
            res.status(401).json({ success: false, message: 'Login failed' });
        }
    } catch (err) {
        // Handle exceptions by sending a 500 Internal Server Error response with the error message
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
