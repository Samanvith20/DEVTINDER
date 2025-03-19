const socket = require("socket.io");
const crypto = require("crypto");
const getSecretRoomId = (userId, targetUserId) => {
  return crypto
    .createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  // event listeners
  io.on("connection", (socket) => {
    console.log("New client connected");
    socket.on(
      "joinRoom",

      ({ userId, username, targetId }) => {
        const roomName = getSecretRoomId(userId, targetId);
        socket.join(roomName);
        console.log(`A user with ${username} joined room ${roomName}`);
      }
    );
    socket.on("sendMessage", ({ userId, targetId, text }) => {
      const roomName = getSecretRoomId(userId, targetId);
      socket.to(roomName).emit("receiveMessage", { userId, text });
    });
    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });
};

module.exports = initializeSocket;
