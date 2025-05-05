
// models/Card.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  title: {
    type: String,required: true,trim: true
  },
  description: {
    type: String,trim: true
  },
  list: {
    type: Schema.Types.ObjectId, ref: 'List',required: true
  },
  board: {
    type: Schema.Types.ObjectId, ref: 'Board',required: true
  },
  position: {
    type: Number,required: true
  },
  dueDate: {type: Date
  },
  labels: [{
    text: String,color: String
  }],
  attachments: [{
    name: String,url: String,
    added: {type: Date, default: Date.now
    }
  }],
  members: [{
    type: Schema.Types.ObjectId,ref: 'User'
  }],
  cover: {
    color: String,image: String,
    isFull: {
      type: Boolean,default: false
    }
  },
  createdBy: {
    type: Schema.Types.ObjectId,ref: 'User', required: true
  },
  createdAt: {
    type: Date,default: Date.now
  },
  updatedAt: {
    type: Date, default: Date.now
  }
});

module.exports = mongoose.model('Card', CardSchema);