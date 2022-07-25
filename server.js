const express = require('express');
const socketIO = require('socket.io');
const Analysis = require('./Classes/Analysis');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const app = express();

global.CURRENT_MOOD = 'official';
global.CURRENT_LANG = 'en';
global.sockets = {};
global.clients = {};

const server = app.listen(PORT, () => console.log(`Listening on ${PORT}`));

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

const io = socketIO(server);

let analysis = new Analysis();

io.on('connection', (socket) => {

  sockets[socket.id] = socket;
  clients[socket.id] = {
    questions: [],
    answers: [],
    wfa: {
      current: 0,
      asked: []
    },
    user: {
      name: 'Dear user',
      country: false,
      job: false
    },
    data: {botName: "VeyBot"}
  };

  socket.emit('message',
    `<p>Hello dear user.</p>
    <p>My name is Veybot.</p>
    <p>I am a robot and i was created by Vahid Esmaeili.</p>
    <p>Please talk to me so I can learn new things from you.</p>
    <p>You can ask me questions about anything, including my creator, 
    myself, or anything else, such as the weather, etc.</p>`
  );

  socket.on('message', message => {

    let answer = analysis.exec(message, socket.id);

    socket.emit('message', answer);

  });

  socket.on('disconnect', () => {
    delete sockets[socket.id];
  });

});


//setInterval(() => io.emit('time', new Date().toTimeString()), 1000);