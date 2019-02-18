const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cv = require("opencv4nodejs");

const FPS = 30;
const wCap = new cv.VideoCapture(0);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 560);
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 560);

app.use("/", express.static(__dirname + "/public"));

setInterval(function() {
  const frame = wCap.read();
  const image = cv.imencode(".jpg", frame).toString("base64");
  io.emit("image", image);
}, 1000 / FPS);

// const frame = wCap.read();
// const image = cv.imencode('.jpg',frame).toString('base64');
// io.emit('image',image);

// io.emit('image',image);

// require("fs").writeFile("input.png",image,'base64',function(err) {
//     //console.log(err);
// });
// var spawn = require('child_process').spawn;
// var process = spawn('python',['./model.py']);
// //console.log('Script running.');
// process.stdout.on('data',function(result){
//     var textChunk = result.toString('utf-8'); // buffer to string
//     console.log(textChunk);
//     console.log("Sending the response.")
//     io.emit('text',textChunk);
// });

server.listen(4444, function() {
  console.log("Server started");
});
