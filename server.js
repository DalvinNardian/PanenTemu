const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Logging middleware
app.use((req, res, next) => {
  console.log(`Requested URL: ${req.url}`);
  next();
});

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/views", express.static(path.join(__dirname, "views")));

// Specific routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "pelanggan", "index.html"));
});

app.get("/product/allproduct.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "product", "allproduct.html"));
});

// Socket.io
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start server
server.listen(5500, () => {
  console.log("Server is running on http://localhost:5500");
});
