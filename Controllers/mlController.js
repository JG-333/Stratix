const axios = require('axios');

exports.getPrediction = async (req, res) => {
  try {
    const { data } = await axios.get('http://localhost:5001/predict');
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Prediction service unavailable" });
  }
};