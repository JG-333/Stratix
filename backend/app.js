const express = require('express');
const mongoose = require('mongoose');
const mysql = require('mysql2');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config();

// Import Routes
const userRoutes = require('./routes/userRoutes');
const processRoutes = require('./routes/processRoutes');
const simulationRoutes = require('./routes/simulationRoutes');
const mlRoutes = require('./routes/mlRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// MySQL Connection
const mysqlConnection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
mysqlConnection.connect(err => {
  if (err) console.error('MySQL connection error: ' + err.stack);
  else console.log('Connected to MySQL as id ' + mysqlConnection.threadId);
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
  let processTemp = 25;
  let processRPM = 1000;

  setInterval(() => {
    processTemp += Math.random() * 4 - 2; // random fluctuations
    processRPM += Math.random() * 20 - 10;

    const status = processTemp > 80 ? "Alert" : "Running";

    io.emit('processData', {
      temperature: processTemp.toFixed(2),
      rpm: Math.round(processRPM),
      status: status
    });
  }, 1000); // send updates every 1 second
  
  socket.on('sendMessage', async ({ username, message }) => {
    io.emit('receiveMessage', { username, message, timestamp: new Date() });
  
    // Save message to MongoDB
    try {
      const newMsg = new (require('./models/ChatMessage'))({ username, message });
      await newMsg.save();
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });
  
});

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/processes', processRoutes);
app.use('/api/simulations', simulationRoutes);
app.use('/api/ml', mlRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// app.js 
const passport = require('passport');
require('./config/passport');
app.use(passport.initialize());
