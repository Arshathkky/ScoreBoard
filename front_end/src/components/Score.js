// App.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import AdminApp from './AdminApp';
import UserApp from './UserApp';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Score() {
  const [scores, setScores] = useState([]);
  const [selectedScoreId, setSelectedScoreId] = useState(null);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/scores')
      .then(response => {
        setScores(response.data);
      })
      .catch(error => console.error('Error fetching scores:', error));

    socket.on('initialScores', (initialScores) => {
      setScores(initialScores);
    });

    socket.on('scoreUpdated', (updatedScore) => {
      setScores((prevScores) =>
        prevScores.map((score) =>
          score._id === updatedScore._id ? updatedScore : score
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUpdateScore = (scoreId) => {
    // Handle update logic (same as in the original App.js)
  };

  const handleDeleteScore = (scoreId) => {
    // Handle delete logic (same as in the original App.js)
  };

  // Determine whether to render the admin or user view
  const isAdmin = true; // Set this based on the user's role or authentication
  const renderApp = isAdmin ? (
    <AdminApp
      scores={scores}
      handleUpdateScore={handleUpdateScore}
      handleDeleteScore={handleDeleteScore}
    />
  ) : (
    <UserApp scores={scores} />
  );

  return (
    <div>
      <h1>Live Scoreboard</h1>
      {renderApp}
    </div>
  );
}

export default Score;
