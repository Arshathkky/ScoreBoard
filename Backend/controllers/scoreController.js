// scoreController.js
const Score = require('./scoreModel');

async function getInitialScores(socket) {
  try {
    const scores = await Score.find();
    socket.emit('initialScores', scores);
  } catch (error) {
    console.error('Error fetching initial scores:', error);
  }
}

async function updateScore(socket, updatedScore) {
  try {
    const { _id, ...updatedFields } = updatedScore;
    const updatedDoc = await Score.findByIdAndUpdate(_id, updatedFields, { new: true });
    io.emit('scoreUpdated', updatedDoc);
  } catch (error) {
    console.error('Error updating score:', error);
  }
}

module.exports = { getInitialScores, updateScore };
