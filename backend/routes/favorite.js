// routes/favorites.js
const express = require('express');
const FavoriteCountry = require('../models/Favorite');
const router = express.Router();

// Add a favorite country
router.post('/',async (req, res) => {
  try {
    const { name, capital, population, flagUrl } = req.body;
    const newFavorite = new FavoriteCountry({ name, capital, population, flagUrl });
    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all favorite countries
router.get('/', async (req, res) => {
  try {
    const favorites = await FavoriteCountry.find();
    res.json(favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedFavorite = await FavoriteCountry.findByIdAndDelete(id);
    if (!deletedFavorite) {
      return res.status(404).json({ message: 'Favorite not found' });
    }
    res.status(204).json({ message: 'Favorite deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
