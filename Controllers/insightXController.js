const { analyzeData } = require('../services/insightXService');

// Get data analysis
exports.getInsightXResults = async (req, res) => {
  try {
    const data = req.body.data;
    const analysis = await analyzeData(data);
    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error analyzing data:", error);
    res.status(500).json({ message: 'Data analysis failed' });
  }
};
