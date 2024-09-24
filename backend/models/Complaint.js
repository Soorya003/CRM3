const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['Pending', 'Resolved', 'In Progress'], // Add 'In Progress' here
    default: 'Pending'
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
