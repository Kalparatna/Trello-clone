// models/List.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  title: {
    type: String,required: true,trim: true
  },
  board: {
    type: Schema.Types.ObjectId,ref: 'Board', required: true
  },
  position: {
    type: Number,required: true
  },
  createdAt: {
    type: Date, default: Date.now
  },
  updatedAt: {
    type: Date,default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for populating cards
ListSchema.virtual('cards', {
  ref: 'Card',localField: '_id',foreignField: 'list'
});

module.exports = mongoose.model('List', ListSchema);
