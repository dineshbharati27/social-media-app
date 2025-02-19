const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');
const storyRoutes = require('./routes/storyRoutes');
const messageRoutes = require('./routes/messageRoutes');
dotenv.config();
connectDB();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("api working");
})

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/messages', messageRoutes);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join a chat room
    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });
  
    // Handle new messages
    socket.on('send_message', (data) => {
      io.to(data.roomId).emit('receive_message', data);
    });
  
    // Handle typing indicator
    socket.on('typing', (data) => {
      socket.to(data.roomId).emit('user_typing', data);
    });
  
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));