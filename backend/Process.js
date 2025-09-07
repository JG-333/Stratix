const mongoose = require('mongoose');

const processSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Running' }, 
  metrics: {
    temperature: { type: Number, default: 25 },
    rpm: { type: Number, default: 1000 },
  },
}, { timestamps: true });

module.exports = mongoose.model('Process', processSchema);