// AdminApp.js
import React, { useState } from 'react';
import axios from 'axios';

const AddScore = ({ scores, handleUpdateScore, handleDeleteScore }) => {
  const [newScore, setNewScore] = useState({
    sport: '',
    team1: { name: '', score: 0, members: [] },
    team2: { name: '', score: 0, members: [] },
  });

  const handleAddScore = () => {
    axios.post('http://localhost:5000/scores', newScore)
      .then(response => {
        setNewScore({
          sport: '',
          team1: { name: '', score: 0, members: [] },
          team2: { name: '', score: 0, members: [] },
        });

        // Assume there is a callback function from the parent component to update scores
      })
      .catch(error => console.error('Error adding score:', error));
  };

  const handleUpdateSubmit = (selectedScoreId) => {
    axios.patch(`http://localhost:5000/scores/${selectedScoreId}`, newScore)
      .then((response) => {
        // Assume there is a callback function from the parent component to update scores
      })
      .catch((error) => console.error('Error updating score:', error));
  };

  return (
    <div>
      <h1>Admin View</h1>

      {/* Form to add or update scores */}
      {/* ... (Same as in the original App.js) */}
      <form onSubmit={isUpdateMode ? handleUpdateSubmit : handleAddScore}>
        <label>
          Sport:
          <input
            type="text"
            value={newScore.sport}
            onChange={(e) => setNewScore({ ...newScore, sport: e.target.value })}
          />
        </label>
        <label>
          Team 1:
          <input
            type="text"
            value={newScore.team1.name}
            onChange={(e) => setNewScore({ ...newScore, team1: { ...newScore.team1, name: e.target.value } })}
          />
          Score:
          <input
            type="number"
            value={newScore.team1.score}
            onChange={(e) => setNewScore({ ...newScore, team1: { ...newScore.team1, score: parseInt(e.target.value, 10) } })}
          />
        </label>
        <label>
          Team 2:
          <input
            type="text"
            value={newScore.team2.name}
            onChange={(e) => setNewScore({ ...newScore, team2: { ...newScore.team2, name: e.target.value } })}
          />
          Score:
          <input
            type="number"
            value={newScore.team2.score}
            onChange={(e) => setNewScore({ ...newScore, team2: { ...newScore.team2, score: parseInt(e.target.value, 10) } })}
          />
        </label>
        <button type="submit">{isUpdateMode ? 'Update Score' : 'Add Score'}</button>

        {isUpdateMode && (
          <div>
            <button type="button" onClick={handleCancelUpdate}>
              Cancel Update
            </button>
          </div>
        )}
      </form>
      {/* List of scores with update and delete buttons */}
      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            <strong>{score.sport}</strong>
            <p>Team 1: {score.team1.name} - {score.team1.score}</p>
            <p>Team 2: {score.team2.name} - {score.team2.score}</p>
            <button onClick={() => handleUpdateScore(score._id)}>
              Update
            </button>
            <button onClick={() => handleDeleteScore(score._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddScore;
