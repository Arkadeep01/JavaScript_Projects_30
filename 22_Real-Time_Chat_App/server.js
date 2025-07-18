const express = require("express");
const http = require("http");               // express server
const{Server} = require("socket.io");

const app = express();
const server = http.createServer(app);      // creates a raw http server for running the websockets
const io = new Server(server);              // Initializes the socket.io for real time messaging

// Creates Server Frontend Files...
app.use(express.static("public"));

// Websocket Connection
io.on("connection", (socket) => {                   // handles new websocket connections
    console.log("A user connected", socket.id);

    socket.on("chat message", (msg) => {            // It listen for messages for specific clients 
        console.log("Message Received:", msg);
        io.emit("chat message", msg);               // Broadcast to all clients
    });

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    });
})

// Start the Server
server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000")
});