const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, enum: ['borrow', 'return'], required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
