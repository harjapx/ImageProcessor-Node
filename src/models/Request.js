const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  status: { type: String, default: 'Pending' }
});

module.exports = mongoose.model('Request', requestSchema);
