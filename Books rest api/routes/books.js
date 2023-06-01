const express = require('express');
const { allBooks, singleBook, createBook, updateBook, deleteBook } = require('../controller/booksControl');

const router = express.Router();


// GET /books: Retrieve all books
router.get('/books', allBooks);
  
  // GET /books/:id: Retrieve a specific book by ID
  router.get('/books/:id', singleBook);
  
  // POST /books: Create a new book
  router.post('/books', createBook);
  
  // PUT /books/:id: Update a book by ID
  router.put('/books/:id', updateBook);
  
  // DELETE /books/:id: Delete a book by ID
  router.delete('/books/:id', deleteBook);


module.exports = router;