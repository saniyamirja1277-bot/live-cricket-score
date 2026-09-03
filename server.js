const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const cron = require('node-cron');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Cricket API Mock Data
let mockMatches = [
  {
    id: 1,
    team1: "India",
    team2: "Australia",
    date: new Date().toISOString(),
    status: "Live",
    team1Score: 245,
    team1Wickets: 4,
    team1Overs: 45.3,
    team2Score: 200,
    team2Wickets: 3,
    team2Overs: 42,
    venue: "MCG, Melbourne",
    format: "ODI"
  },
  {
    id: 2,
    team1: "Pakistan",
    team2: "England",
    date: new Date(Date.now() + 86400000).toISOString(),
    status: "Upcoming",
    venue: "Lord's, London",
    format: "Test"
  },
  {
    id: 3,
    team1: "West Indies",
    team2: "South Africa",
    date: new Date(Date.now() - 172800000).toISOString(),
    status: "Completed",
    team1Score: 189,
    team1Wickets: 10,
    team2Score: 156,
    team2Wickets: 10,
    venue: "Kensington Oval, Barbados",
    format: "T20"
  },
  {
    id: 4,
    team1: "Sri Lanka",
    team2: "New Zealand",
    date: new Date(Date.now() + 172800000).toISOString(),
    status: "Upcoming",
    venue: "Eden Park, Auckland",
    format: "ODI"
  }
];

// API Routes
app.get('/api/matches', (req, res) => {
  res.json(mockMatches);
});

app.get('/api/matches/live', (req, res) => {
  const liveMatches = mockMatches.filter(m => m.status === 'Live');
  res.json(liveMatches);
});

app.get('/api/matches/:id', (req, res) => {
  const match = mockMatches.find(m => m.id === parseInt(req.params.id));
  if (match) {
    res.json(match);
  } else {
    res.status(404).json({ error: 'Match not found' });
  }
});

// WebSocket Connection
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  socket.emit('message', 'Welcome to Live Cricket Score!');

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Auto-update scores every 10 seconds
cron.schedule('*/10 * * * * *', () => {
  mockMatches.forEach(match => {
    if (match.status === 'Live') {
      match.team1Score += Math.floor(Math.random() * 3);
      match.team1Overs = (Math.floor(match.team1Overs) + Math.floor(Math.random() * 0.5)).toFixed(1);
      if (Math.random() > 0.8) match.team1Wickets += 1;
    }
  });
  io.emit('scoreUpdate', mockMatches);
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🏏 Cricket Score Server running on http://localhost:${PORT}`);
});
