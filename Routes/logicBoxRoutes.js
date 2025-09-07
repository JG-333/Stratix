const express = require('express');
const { processData } = require('../controllers/logicBoxController');
const router = express.Router();

router.post('/process', processData);

module.exports = router;
