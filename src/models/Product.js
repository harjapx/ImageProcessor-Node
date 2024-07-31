const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  serialNumber: { type: String, required: true },
  productName: { type: String, required: true },
  inputImageUrls: [{ type: String }],
  outputImageUrls: [{ type: String }],
  requestId: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
