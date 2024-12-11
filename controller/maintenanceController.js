const Book = require('../Model/Book');
const User = require('../Model/User');

// Add a new book
const addBook = async (req, res) => {
  try {
    const { title, codeFrom, codeTo, category } = req.body;
    const newBook = new Book({ title, codeFrom, codeTo, category });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    console.error('Error adding book:', error);
    res.status(500).json({ message: 'Error adding book' });
  }
};

// Get all books
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('borrowedBy', 'name'); // Populate borrowedBy with user name
    res.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    await Book.findByIdAndDelete(bookId);
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error('Error deleting book:', error);
    res.status(500).json({ message: 'Error deleting book' });
  }
};

// Get all users (for reports page)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
};

module.exports = { addBook, getAllBooks, deleteBook, getAllUsers };
