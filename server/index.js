const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { createRoom, getRoom } = require('./roomState');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

io.on('connection', socket => {
  socket.on('join-room', ({ room, name }) => {
    socket.join(room);
    const r = createRoom(room);
    r.users.push({ id: socket.id, name });
    io.to(room).emit('room-state', r);
  });

  socket.on('workspace-load', ({ room, object }) => {
    const r = getRoom(room);
    r.current = object;
    io.to(room).emit('workspace-update', r);
  });

  socket.on('workspace-action', data => {
    io.emit('workspace-action', data);
  });

  socket.on('chat-message', msg => {
    io.emit('chat-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => console.log('Server running on port 4000'));