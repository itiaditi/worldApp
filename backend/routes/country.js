const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:currencyCode', async (req, res) => {
  try {
    const { currencyCode } = req.params;
    const response = await axios.get(`https://restcountries.com/v3.1/currency/${currencyCode}`);
    const countries = response.data.map(country => ({
      name: country.name.common,
      currency: country.currencies[currencyCode].name,
      capital: country.capital[0],
      languages: Object.values(country.languages),
      flag: `https://flagsapi.com/${country.cca2}/shiny/84.png`
    }));
    res.send(countries);
  } catch (error) {
    res.status(500).send({ message: 'Error fetching country data' });
  }
});

module.exports = router;
