const express = require('express');
const router = express.Router();
const { addBook, getAllBooks, deleteBook, getAllUsers } = require('../controller/maintenanceController');

// Routes for book management
router.post('/api/books', addBook);
router.get('/api/books', getAllBooks);
router.delete('/api/books/:bookId', deleteBook);

// Route to get all users (for reports page)
router.get('/api/users', getAllUsers);

module.exports = router;
