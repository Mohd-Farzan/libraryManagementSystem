const Transaction = require('../Model/Transection');
const Book = require('../Model/Book');
const User = require('../Model/User');

// Borrow a book
const borrowBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(400).json({ message: 'Book or User not found' });
    }

    if (book.borrowedBy) {
      return res.status(400).json({ message: 'Book already borrowed' });
    }

    book.borrowedBy = user._id;
    await book.save();

    const transaction = new Transaction({
      book: book._id,
      user: user._id,
      action: 'borrow',
    });
    await transaction.save();

    res.status(200).json({ message: 'Book borrowed successfully', transaction });
  } catch (error) {
    console.error('Error borrowing book:', error);
    res.status(500).json({ message: 'Error borrowing book' });
  }
};

// Return a book
const returnBook = async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book || !user) {
      return res.status(400).json({ message: 'Book or User not found' });
    }

    if (book.borrowedBy.toString() !== user._id.toString()) {
      return res.status(400).json({ message: 'Book not borrowed by this user' });
    }

    book.borrowedBy = null;
    await book.save();

    const transaction = new Transaction({
      book: book._id,
      user: user._id,
      action: 'return',
    });
    await transaction.save();

    res.status(200).json({ message: 'Book returned successfully', transaction });
  } catch (error) {
    console.error('Error returning book:', error);
    res.status(500).json({ message: 'Error returning book' });
  }
};

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('book', 'title')
      .populate('user', 'name');
    res.json(transactions);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
};

module.exports = { borrowBook, returnBook, getAllTransactions };
