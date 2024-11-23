const express = require("express");
const { createServer } = require("node:http");
const { join } = require("node:path");
const { Server } = require("socket.io");

const app = express();
const server = createServer(app);
const io = new Server(server);

const allowCORS = function(req, res, next) {
  var origin = req.get('origin');
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
};

app.get("/", allowCORS, (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("coords", (coords) => {
    console.log("===== Coordinates =====");
    console.log(coords);
  });
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
