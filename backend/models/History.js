
const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  code: { type: String, required: true },
  language: { type: String, required: true },
  level: { type: String, required: true },
  result: {
    explanation: String,
    errors: String,
    complexity: String,
    summary: String
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('History', historySchema);