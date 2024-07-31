const express = require('express')
const router = express.Router()
const pool = require('../models/databaseConnect')


// API route to update a book
router.put("/:id", async (req, res) => {
    try {
      const [result] = await pool.execute(
        "UPDATE books SET `title`=?, `desc`=?, `price`=?, `cover`=? WHERE id = ?",
        [req.body.title, req.body.desc, req.body.price, req.body.cover, req.params.id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book updated successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while updating the book' });
    }
  });

  module.exports = router