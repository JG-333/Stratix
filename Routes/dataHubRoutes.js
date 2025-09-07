const express = require('express');
const { ingestData } = require('../controllers/dataHubController');
const router = express.Router();

router.post('/ingest', ingestData);

module.exports = router;
