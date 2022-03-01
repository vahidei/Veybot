const express = require('express');
const socketIO = require('socket.io');
const Moods = require('./Classes/Moods');
const Analysis = require('./Classes/Analysis');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const app = express();

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const io = socketIO(server);

let moods = new Moods();
let analysis = new Analysis();

let current_mood = 'official';

io.on('connection', (socket) => {

  socket.on('message', message => {

      message = message.toLowerCase();
      
      let analyzed_answer = analysis.exec(message);

      let answer = message + ' amoo '+ JSON.stringify(analyzed_answer);

      socket.emit('message', answer);

  });

});


setInterval(() => io.emit('time', new Date().toTimeString()), 1000);