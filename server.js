const express = require("express");
const cv = require("opencv4nodejs");
const path = require("path");
const app = express();

const server = require("http").Server(app);
const io = require("socket.io")(server);

const FPS = 30;
const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 560);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 560);

// Middleware for POST request data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode(".jpg", frame).toString("base64");
  io.emit("image", image);
}, 1000 / FPS);

server.listen(4444, function() {
  console.log("Server started.");
});
