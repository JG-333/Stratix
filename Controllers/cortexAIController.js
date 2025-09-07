const { processData } = require('../services/cortexAIService');

// Get AI-generated decision
exports.getCortexAIResults = async (req, res) => {
  try {
    const inputData = req.body.data;
    const aiResult = await processData(inputData);
    res.status(200).json(aiResult);
  } catch (error) {
    console.error("Error processing AI request:", error);
    res.status(500).json({ message: 'AI processing failed' });
  }
};
