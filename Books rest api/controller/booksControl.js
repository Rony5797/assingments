const Book = require('../models/booksModel');


exports.allBooks = async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }


 exports.singleBook = async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  exports.createBook = async (req, res) => {
    try {
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  exports.updateBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (err) {
      res.status(400).json({ error: 'Bad request' });
    }
  }

  exports.deleteBook = async (req, res) => {
    try {
      const book = await Book.findByIdAndDelete(req.params.id);
      if (book) {
        res.status(200).json({ message: 'Book deleted successfully' });
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (err) {
      res.status(400).json({ error: 'Bad request' });
    }
  }