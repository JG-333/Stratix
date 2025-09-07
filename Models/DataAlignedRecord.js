const mongoose = require('mongoose');

const DataAlignedRecordSchema = new mongoose.Schema({
  originalData: { type: Object },
  cleanedData: { type: Object },
  normalizedData: { type: Object },
  mappedData: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DataAlignedRecord', DataAlignedRecordSchema);
