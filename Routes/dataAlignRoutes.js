const express = require('express');
const { cleanData, normalizeData, mapData } = require('../controllers/dataAlignController');
const router = express.Router();

router.post('/clean', cleanData);
router.post('/normalize', normalizeData);
router.post('/map', mapData);

module.exports = router;
