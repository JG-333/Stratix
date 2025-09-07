const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("Simulation API Running!");
});

module.exports = router;