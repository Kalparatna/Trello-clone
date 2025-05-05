// models/Board.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  title: {
    type: String,required: true,trim: true
  },
  background: {
    type: {
      type: String,enum: ['image', 'color'],required: true
    },
    src: {type: String,required: function() {
        return this.background.type === 'image';
      }
    },
    color: {type: String,required: function() {
        return this.background.type === 'color';
      }
    }
  },
  visibility: {
    type: String,enum: ['Workspace', 'Private'],default: 'Workspace'
  },
  owner: {
    type: Schema.Types.ObjectId,ref: 'User',required: true
  },
  members: [{
    type: Schema.Types.ObjectId,ref: 'User'
  }],
  createdAt: { type: Date, default: Date.now
  },
 updatedAt: { type: Date,default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for populating lists
BoardSchema.virtual('lists', {
  ref: 'List',
  localField: '_id',
  foreignField: 'board'
});

module.exports = mongoose.model('Board', BoardSchema);
