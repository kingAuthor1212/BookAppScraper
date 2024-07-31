// Newer way mysql 8.*
const express = require('express');
const cors = require("cors");
const app = express();
app.use(express.json()) //middleware allows to send json as client
app.use(cors())

// API route to fetch books
const getBooks = require('./routes/getBooks')
app.use('/getBooks', getBooks)

// API route to create a new book
const addBook = require('./routes/addBook')
app.use('/addBook', addBook)

// API route to delete a book
const deleteBook = require('./routes/deleteBook');
app.use('/delete', deleteBook)

// API route to update a book
const  updateBook = require('./routes/updateBook');
app.use('/update', updateBook)

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`connected`);
});