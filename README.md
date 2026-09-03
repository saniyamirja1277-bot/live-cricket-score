# 🏏 Live Cricket Score Website

A real-time cricket match score update website with live streaming capabilities.

## Features

✅ **Live Match Scores** - Real-time score updates using WebSockets
✅ **Daily Match Updates** - View today's, upcoming, and completed matches
✅ **Multiple Formats** - Support for ODI, Test, T20 cricket
✅ **Responsive Design** - Works perfectly on desktop and mobile
✅ **Match Details** - Click on any match to see detailed information
✅ **Auto-Refresh** - Scores update automatically every 10 seconds

## Tech Stack

**Backend:**
- Node.js with Express.js
- Socket.IO for real-time WebSocket communication
- Node-Cron for scheduled tasks

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Responsive Grid Layout
- Real-time WebSocket Updates

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/saniyamirja1277-bot/live-cricket-score.git
cd live-cricket-score
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
```bash
cp .env.example .env
```

### 4. Start the Server
```bash
npm start
```

### 5. Open in Browser
Navigate to `http://localhost:5000`

## API Endpoints

### Get All Matches
```
GET /api/matches
```

### Get Live Matches Only
```
GET /api/matches/live
```

### Get Match by ID
```
GET /api/matches/:id
```

## Real-Time Features

- Score updates every 10 seconds
- Live WebSocket connection
- Automatic UI updates without page reload

## Deployment

### Deploy on Vercel
```bash
npm i -g vercel
vercel
```

### Deploy on Heroku
```bash
heroku create your-app-name
git push heroku main
```

## License

MIT License

---

**Made with ❤️ for Cricket Lovers** 🏏
