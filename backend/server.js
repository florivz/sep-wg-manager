const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Testroute
app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const pool = require('./config/db');


// Method to test if server is running on Port 5001
app.get('/testdb', async (req, res) => {
    try {
        const response = await pool.query('SELECT datname FROM pg_database;');
        res.json(response.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
