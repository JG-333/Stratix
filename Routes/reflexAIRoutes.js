const express = require('express');
const { getReflexAIResults } = require('../controllers/reflexAIController');
const router = express.Router();

router.post('/process', getReflexAIResults);

module.exports = router;
