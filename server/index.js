require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var watcher = require("./db/watchDB");
const cors = require("cors");
var apiRouter = require("./routes/api/yiff");
var ws = require("ws");

app.use(express.static("public"));
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/test", apiRouter);

app.get("/", function (req, res) {
  res.send("Hello World");
});

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port);
});

const wss = new ws.WebSocketServer({ server: server, path: "/" });

wss.on("connection", function connection(ws) {
  ws.on("message", function message(data) {
    console.log("receivedd: %s", data);
  });

  ws.send("something");
});

// function broadcastMessage(json) {
//   // We are sending the current data to all connected active clients
//   const data = JSON.stringify(json);
//   for (let userId in clients) {
//     let client = clients[userId];
//     if (client.readyState === WebSocket.OPEN) {
//       client.send(data);
//     }
//   }
// }
