const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes')); 
app.use('/api/subscription', require('./routes/subscriptionRoutes')); 
app.use('/api/videos', require('./routes/videoRoutes')); 

// NAYI LINES — React build serve karne ke liye
app.use(express.static(path.join(__dirname, '../reactapp/build')));
app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../reactapp/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🔥 Server running on port ${PORT}`));