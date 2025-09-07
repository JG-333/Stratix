const { optimizeData } = require('../services/opterisService');

// Optimize data processing
exports.getOptimizedData = async (req, res) => {
  try {
    const rawData = req.body.data;
    const optimizedData = await optimizeData(rawData);
    res.status(200).json(optimizedData);
  } catch (error) {
    console.error("Error optimizing data:", error);
    res.status(500).json({ message: 'Data optimization failed' });
  }
};
