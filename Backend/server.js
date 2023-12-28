// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const scoreRoutes = require('../Backend/Routes/scoreRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5000', methods: ['GET', 'POST'] },
});

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
  'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.1.1/scoreboard',
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  // Send initial scores when a user connects
  getInitialScores(socket);

  // Handle score updates
  socket.on('updateScore', (updatedScore) => {
    updateScore(socket, updatedScore);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Use the routes
app.use('/', scoreRoutes);

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
