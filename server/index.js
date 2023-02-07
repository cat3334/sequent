require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var watcher = require("./db/watchDB");
const cors = require("cors");
var apiRouter = require("./routes/api/yiff");
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
