const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: String,
    content: Object,
    author: String,
    videoLink: String,
    videoTimestamp: Number,
    date: {
      type: Date, default: Date.now
    }
  }, {
    timestamps: true
  });

module.exports = mongoose.model('Note', noteSchema);
