const { monitorEnvironment } = require('../services/ecoIntelService');

// Monitor environmental data
exports.getEcoIntelResults = async (req, res) => {
  try {
    const environmentalData = req.body.data;
    const result = await monitorEnvironment(environmentalData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error processing environmental data:", error);
    res.status(500).json({ message: 'Environment monitoring failed' });
  }
};
