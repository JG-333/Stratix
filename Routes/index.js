const express = require('express');
const router = express.Router();

router.use('/api/cortexAI', require('./cortexAIRoutes'));
router.use('/api/opteris', require('./opterisRoutes'));
router.use('/api/insightX', require('./insightXRoutes'));
router.use('/api/ecoIntel', require('./ecoIntelRoutes'));
router.use('/api/reflexAI', require('./reflexAIRoutes'));

module.exports = router;
