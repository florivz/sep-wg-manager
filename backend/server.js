const express = require('express');
require('dotenv').config();
const cors = require('cors');
const roommatesRoutes = require('./routes/roommatesRoutes');
const shoppingListRoutes = require('./routes/shoppingListRoutes');
const housePlanRoutes = require('./routes/housePlanRoutes');
const cleaningPlanRoutes = require('./routes/cleaningPlanRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Roommates Routes
app.use('/api', roommatesRoutes);

// Shopping List Routes
app.use('/api', shoppingListRoutes);

// House Plan Routes
app.use('/api', housePlanRoutes);

// Cleaning Plan Routes
app.use('/api', cleaningPlanRoutes);

// Testroute
app.get('/serverstatus', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} (http://localhost:5001/)`);
});
