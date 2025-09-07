const express = require('express');
const { getEcoIntelResults } = require('../controllers/ecoIntelController');
const router = express.Router();

router.post('/monitor', getEcoIntelResults);

module.exports = router;
