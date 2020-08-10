const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const Filter = require('bad-words');
const { generateMessage } = require('./utils/messages');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require('./utils/users');

// Initialize express and socket.io servers
const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set up port location
const PORT = process.env.PORT || 3000;
// Create path to the public directory
const publicDirectory = path.join(__dirname, '../public');
// Tell express where static files are held
app.use(express.static(publicDirectory));

// Define what happens when a new connection is created
io.on('connection', socket => {
  console.log('New websocket connection');

  // Event for when a user joins a new chat room
  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);
    socket.emit('message', generateMessage(`${user.room}roombot`, 'Welcome!'));
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        generateMessage(`${user.room}roombot`, `${user.username} has joined!`)
      );

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  // Event for when a user sends a message in the chat room
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed in this chatroom');
    }

    io.to(user.room).emit('message', generateMessage(user.username, message));
    callback('Delivered');
  });

  // Event for when a user sends their location in the chat room
  socket.on('sendLocation', ({ lat, long }, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit(
      'locationMessage',
      generateMessage(user.username, `https://google.com/maps?q=${lat},${long}`)
    );

    callback('Location Shared!');
  });

  // Event for when a user disconnects or leaves the chat room
  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        generateMessage(`${user.room}roombot`, `${user.username} has left`)
      );

      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

// Start up the app listening on the port specified above
server.listen(PORT, () => {
  console.log(`[app]: listening on port ${PORT}`);
});
