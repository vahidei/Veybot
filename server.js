const express = require('express');
const socketIO = require('socket.io');
require('./Autoload');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const app = express();

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('sendMessage', () => {
    console.log('Message Received');
      socket.emit('result', moods.official);
  });
});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
