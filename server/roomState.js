const rooms = {};

function createRoom(id) {
  if (!rooms[id]) {
    rooms[id] = {
      users: [],
      current: null,
      chat: []
    };
  }
  return rooms[id];
}

function getRoom(id) {
  return rooms[id];
}

module.exports = { createRoom, getRoom };