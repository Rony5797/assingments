const mongoose = require('mongoose');



const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: String }
  },{ timestamps: true, versionKey: false });
  
  // Create a book model
  const Book = mongoose.model('Book', bookSchema);

  module.exports = Book;