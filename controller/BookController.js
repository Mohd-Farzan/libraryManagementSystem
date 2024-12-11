const Book = require('../Model/Book');

// Get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.render('home', { books }); // Render the EJS template with books data
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Add a new book
exports.addBook = async (req, res) => {
  try {
    const { codeFrom, codeTo, category } = req.body;
    const newBook = new Book({ codeFrom, codeTo, category });
    await newBook.save();
    res.redirect('/books'); // Redirect to the books page
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to add book');
  }
};

// Delete a book
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to delete book');
  }
};

// Edit a book
exports.editBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { codeFrom, codeTo, category } = req.body;
    await Book.findByIdAndUpdate(id, { codeFrom, codeTo, category });
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update book');
  }
};
