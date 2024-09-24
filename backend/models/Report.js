const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  // Add other fields as needed
});

const Report = mongoose.model('Report', reportSchema);
module.exports = Report;