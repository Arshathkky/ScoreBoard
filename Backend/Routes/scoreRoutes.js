// scoreRoutes.js
const express = require('express');
const Score = require('./scoreModel');
const { getInitialScores, updateScore } = require('./scoreController');

const router = express.Router();

// Create a new score
router.post('/scores', async (req, res) => {
  try {
    const newScore = new Score(req.body);
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all scores
router.get('/scores', async (req, res) => {
  try {
    const scores = await Score.find();
    res.json(scores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a score by ID
router.patch('/scores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedScore = await Score.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a score by ID
router.delete('/scores/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedScore = await Score.findByIdAndDelete(id);
    res.json(deletedScore);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
