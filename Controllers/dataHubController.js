const axios = require('axios');
const cheerio = require('cheerio');
const DataHubRecord = require('../models/DataHubRecord');

exports.ingestData = async (req, res, next) => {
  const { url } = req.body;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const title = $('title').text();
    const metaDesc = $('meta[name="description"]').attr('content') || '';

    const scrapedData = {
      title,
      metaDescription: metaDesc
    };

    const record = new DataHubRecord({ url, scrapedData });
    await record.save();

    // Emit to all connected clients (Socket.IO)
    const io = req.app.get('io');
    io.emit('datahub:new_record', record);

    res.status(201).json(record);
  } catch (error) {
    console.error('Ingest error:', error);
    next(error);
  }
};
