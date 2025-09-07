const mongoose = require('mongoose');

const DataHubRecordSchema = new mongoose.Schema({
  url: { type: String, required: true },
  scrapedData: { type: Object },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DataHubRecord', DataHubRecordSchema);
