// models/FavoriteCountry.js
const mongoose = require('mongoose');

const favoriteCountrySchema = new mongoose.Schema({
  name: { type: String, required: true  },
  capital: { type: String },
  population: { type: Number },
  flagUrl: { type: String }
});

const FavoriteCountry = mongoose.model('FavoriteCountry', favoriteCountrySchema);

module.exports = FavoriteCountry;
