const express = require('express');
const router = express.Router()
const pool = require('../models/databaseConnect')

// API route to fetch books
router.get('/', async (req, res) => {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM books');
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while fetching books' });
    }
  });
module.exports = router