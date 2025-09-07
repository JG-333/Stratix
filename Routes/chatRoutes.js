const express = require('express');
const ChatMessage = require('../models/ChatMessage');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;