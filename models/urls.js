const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortId: {
    type: String,
    required: true
  },
  redirectURL: {
    type: String,
    required: true
  },
  visithistory: [{ timestamp: { type: Number } }],
}, { timestamps: true });

const URL = mongoose.model('URL', urlSchema);

module.exports = URL;
