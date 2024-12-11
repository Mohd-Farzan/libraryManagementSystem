const express = require('express');
const router = express.Router();
const { getAdminDashboard } = require('../controller/AdminController');

// Admin dashboard route
router.get('/admin', getAdminDashboard);

// Routes for other sections (Maintenance Reports, Transactions) can be added later
router.get('/maintenance', (req, res) => {
  res.send('Maintenance Reports');
});

router.get('/transactions', (req, res) => {
  res.send('Transactions');
});

module.exports = router;
