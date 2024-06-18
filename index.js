
const express = require('express')
const { join } = require('node:path')
const { createServer } = require('node:http')
const { Server } = require("socket.io");

const port = 3000
const app = express()
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {}
});


app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
  console.log('a user connected');
  
  // envoie de message
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // notification 
  socket.on('SMessage', (message) => {
    io.emit('Nmessage', {msg: message, id: socket.id});
});

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log(`app listening on port ${port}`)
})

