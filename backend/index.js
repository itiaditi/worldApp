const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user');
const countryRoutes = require('./routes/country');
const favoriteRoutes = require('./routes/favorite');
// const searchRoutes = require('./routes/search');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/countriesDB');

app.use('/api/user', userRoutes);
app.use('/api/country', countryRoutes);
app.use('/api/favorite', favoriteRoutes);
// app.use('/api/search', searchRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
