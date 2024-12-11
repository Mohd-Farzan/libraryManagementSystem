const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getAllTransactions } = require('../controller/transections');

// Routes for managing transactions
router.post('/api/transactions/borrow', borrowBook);
router.post('/api/transactions/return', returnBook);
router.get('/api/transactions', getAllTransactions);

module.exports = router;
