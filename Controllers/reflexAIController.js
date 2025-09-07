const { processReflexAction } = require('../services/reflexAIService');

// Process reflexive actions based on incoming data
exports.getReflexAIResults = async (req, res) => {
  try {
    const data = req.body.data;
    const reflexAction = await processReflexAction(data);
    res.status(200).json(reflexAction);
  } catch (error) {
    console.error("Error processing reflex action:", error);
    res.status(500).json({ message: 'ReflexAI processing failed' });
  }
};
