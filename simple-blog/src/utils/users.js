const users = [];

// Add a new user
const addUser = ({ id, username, room }) => {
  // CLean the data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  // Validate the data
  if (!username || !room) {
    return {
      error: 'Username and room are required',
    };
  }

  // Check for existing users
  const userExisting = users.find(user => {
    return user.room === room && user.username === username;
  });

  // Validate username
  if (userExisting) {
    return {
      error: 'Username is already in use',
    };
  }

  // Store user
  const user = {
    id,
    username,
    room,
  };

  users.push(user);
  return { user };
};

// Remove a user
const removeUser = id => {
  const userToRemove = users.findIndex(user => user.id === id);
  return users.splice(userToRemove, 1)[0];
};

// Get a user
const getUser = id => users.find(user => user.id === id);

// Get the users in a specific room
const getUsersInRoom = room => {
  room = room.trim().toLowerCase();
  const usersInRoom = users.filter(user => user.room === room);

  if (usersInRoom.length === 0) {
    return {
      error: 'There are no users in this room',
    };
  }

  return usersInRoom;
};

module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
};
