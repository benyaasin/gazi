const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  page: {
    type: String,
    required: true
  },
  section: {
    type: String,
    required: true
  },
  title: String,
  description: String,
  imageUrl: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema); 