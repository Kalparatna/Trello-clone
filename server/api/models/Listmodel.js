const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  title: { type: String, required: true },
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
});

module.exports = mongoose.model('List', listSchema);
