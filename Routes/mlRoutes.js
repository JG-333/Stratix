const express = require('express');
const { getPrediction } = require('../controllers/mlController');
const router = express.Router();

router.get('/predict', getPrediction);

module.exports = router;