const DataAlignedRecord = require('../models/DataAlignedRecord');

exports.cleanData = async (req, res, next) => {
  const { data } = req.body;
  try {
    const cleaned = {};
    for (const key in data) {
      if (data[key] !== null && data[key] !== '' && data[key] !== undefined) {
        cleaned[key.trim()] = String(data[key]).trim();
      }
    }

    const record = new DataAlignedRecord({ originalData: data, cleanedData: cleaned });
    await record.save();

    const io = req.app.get('io');
    io.emit('dataalign:cleaned', record);

    res.status(201).json(record);
  } catch (error) {
    console.error('Clean Data error:', error);
    next(error);
  }
};

exports.normalizeData = async (req, res, next) => {
  const { cleanedData } = req.body;
  try {
    const normalized = {};
    for (const key in cleanedData) {
      normalized[key.toLowerCase()] = cleanedData[key];
    }

    const record = await DataAlignedRecord.findByIdAndUpdate(
      req.body.id,
      { normalizedData: normalized },
      { new: true }
    );

    const io = req.app.get('io');
    io.emit('dataalign:normalized', record);

    res.status(200).json(record);
  } catch (error) {
    console.error('Normalize error:', error);
    next(error);
  }
};

exports.mapData = async (req, res, next) => {
  const { normalizedData, mappingRules } = req.body;
  try {
    const mapped = {};
    for (const key in normalizedData) {
      if (mappingRules[key]) {
        mapped[mappingRules[key]] = normalizedData[key];
      } else {
        mapped[key] = normalizedData[key];
      }
    }

    const record = await DataAlignedRecord.findByIdAndUpdate(
      req.body.id,
      { mappedData: mapped },
      { new: true }
    );

    const io = req.app.get('io');
    io.emit('dataalign:mapped', record);

    res.status(200).json(record);
  } catch (error) {
    console.error('Mapping error:', error);
    next(error);
  }
};
