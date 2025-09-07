const express = require('express');
const router = express.Router();
const Process = require('../models/Process');

router.get('/', async (req, res) => {
  try {
    const processes = await Process.find();
    res.json(processes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, description, status, metrics } = req.body;
    const newProcess = new Process({ name, description, status, metrics });
    const savedProcess = await newProcess.save();
    res.status(201).json(savedProcess);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const process = await Process.findById(req.params.id);
    if (!process) return res.status(404).json({ message: 'Process not found' });
    res.json(process);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { name, description, status, metrics } = req.body;
    const updatedProcess = await Process.findByIdAndUpdate(
      req.params.id,
      { name, description, status, metrics },
      { new: true }
    );
    if (!updatedProcess) return res.status(404).json({ message: 'Process not found' });
    res.json(updatedProcess);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedProcess = await Process.findByIdAndDelete(req.params.id);
    if (!deletedProcess) return res.status(404).json({ message: 'Process not found' });
    res.json({ message: 'Process deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;