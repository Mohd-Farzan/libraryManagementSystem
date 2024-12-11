const express = require('express');
const router = express.Router();
const BookController = require('../controller/BookController');

// Routes for book management
router.get('/books', BookController.getAllBooks);
router.post('/books', BookController.addBook);
router.post('/books/edit/:id', BookController.editBook);
router.post('/books/delete/:id', BookController.deleteBook);

module.exports = router;
