const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  recipientName: { type: String, required: true },
  recipientEmail: { type: String, required: true },
  encryptedData: { type: String, required: true },
  encryptedSymmetricKey: { type: String, required: true },
});

module.exports = mongoose.model('Certificate', certificateSchema);