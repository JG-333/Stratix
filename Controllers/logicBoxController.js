const { runSimpleModel } = require('../services/aiModelService');
const LogicBoxResult = require('../models/LogicBoxResult');

exports.processData = async (req, res, next) => {
  const { inputData } = req.body;
  try {
    const processedResult = await runSimpleModel(inputData);
    const record = new LogicBoxResult({ inputData, processedResult });
    await record.save();

    const io = req.app.get('io');
    io.emit('logicbox:processed', record);

    res.status(201).json(record);
  } catch (error) {
    console.error('LogicBox Processing error:', error);
    next(error);
  }
};
