// UserApp.js
import React from 'react';

const UserApp = ({ scores }) => {
  return (
    <div>
      <h1>User View</h1>

      {/* List of scores without update and delete buttons */}
      <ul>
        {scores.map((score) => (
          <li key={score._id}>
            <strong>{score.sport}</strong>
            <p>Team 1: {score.team1.name} - {score.team1.score}</p>
            <p>Team 2: {score.team2.name} - {score.team2.score}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserApp;
