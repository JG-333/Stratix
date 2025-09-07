const express = require('express');
const { getOptimizedData } = require('../controllers/opterisController');
const router = express.Router();

router.post('/optimize', getOptimizedData);

module.exports = router;
