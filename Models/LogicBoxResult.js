const mongoose = require('mongoose');

const LogicBoxResultSchema = new mongoose.Schema({
  inputData: { type: Object, required: true },
  processedResult: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('LogicBoxResult', LogicBoxResultSchema);
