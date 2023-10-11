const express = require('express');
require('dotenv').config();
const cors = require('cors');
const roommatesRoutes = require('./routes/roommatesRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes'); // Füge die Shopping-List-Routen hinzu

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Roommates Routes
app.use('/api', roommatesRoutes);

// Shopping List Routes
app.use('/api', shoppingListRoutes); // Füge die Shopping-List-Routen hinzu

// Testroute
app.get('/serverstatus', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
