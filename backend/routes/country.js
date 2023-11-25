
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Country = require("../Model/country");





router.use(express.json());

router.post('/countries', async (req, res) => {
    try {
      const newCountry = req.body; // Assuming the request body contains the new country data
      const result = await Country.create(newCountry);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

router.get('/countries', async (req, res) => {
    try {
      const countries = await Country.find();
      res.json(countries);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  module.exports = router;