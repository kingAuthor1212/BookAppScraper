const express = require('express')
const router = express.Router()
const pool = require('../models/databaseConnect')


// API route to create a new book
router.post('/', async (req, res) => {
    try {
      const [result] = await pool.execute(
        'INSERT INTO books (`title`, `desc`,`price`, `cover`, `urldownload`) VALUES (?, ?, ?, ?, ?)',
        [req.body.title, req.body.desc, req.body.price, req.body.cover, req.body.urldownload]
      );
      res.json( 'Book has been created' );
    } catch (err) {
      console.error(err);
      res.status(401).json({ error: 'An error occurred while creating a book' });
    }
  });

  module.exports = router