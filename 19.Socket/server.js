import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app); // *Create an HTTP server instance

const io = new Server(server); // *Initialize socket.io and pass the server instance

app.use(express.static('public')); // *Set the static folder for serving static files which is public directory

const users = new Set(); // *Create a set to store the connected users

// ? Socket.io event listener for when a new client connects
io.on("connection", (socket) => {
  console.log("A user is connected");

  // ? handle users when they join the chat
  socket.on('join', (username) => {
    users.add(username); //* Add the username to the set of connected users
    socket.userName = username;  // * Store the username in the socket object for reference

    // *broadcast to all client/users that a new user has joined
    io.emit("joined", username);
    // *Send the updated user list to all client
    io.emit("userList", Array.from(users));
  });

  // ? handle incoming messages
  socket.on("chatMessage", (message) => {
    // *Broadcast the received message to all connected clients
    io.emit("chatMessage", message);
  });

  // ?Handle disconnections from clients || When a user disconnects, remove them from the set
  socket.on("disconnect", () => {
    console.log("An user has disconnected!!!");
    users.forEach( user => {
      //* Check if the current user in the set matches the user that disconnected
      if (user === socket.userName) {
        users.delete(user); //* Remove the user from the set of connected users
        io.emit("userLeft", user); //* Broadcast to all clients that a user has left
        io.emit("userList", Array.from(users)); //* Send the updated user list to all clients
      }
    })  
  });

})
// ?Start the server on port 3000
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});