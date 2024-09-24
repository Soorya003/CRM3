const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('Order', orderSchema);
