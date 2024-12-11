const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  codeFrom: {
    type: String,
    required: true,
  },
  codeTo: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  borrowedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model
    default: null, // If no user borrows, it's null
  },
  borrowDate: {
    type: Date,
    default: null,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
