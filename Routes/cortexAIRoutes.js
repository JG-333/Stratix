const express = require('express');
const { getCortexAIResults } = require('../controllers/cortexAIController');
const router = express.Router();

router.post('/process', getCortexAIResults);

module.exports = router;
