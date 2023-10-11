const express = require('express');
require('dotenv').config();
const cors = require('cors');
const roommatesRoutes = require('./routes/roommatesRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', roommatesRoutes);

// Testroute
app.get('/serverstatus', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
