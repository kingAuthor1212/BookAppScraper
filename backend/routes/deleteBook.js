const express = require('express')
const router = express.Router()
const pool = require('../models/databaseConnect'
)

// API route to delete a book
router.delete("/:id", async (req, res) => {
    try {
      const [result] = await pool.execute("DELETE FROM books WHERE id = ?", [req.params.id]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred while deleting the book' });
    }
  });
  

  module.exports = router