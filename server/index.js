require("dotenv").config();
var express = require("express");
var app = express();
const session = require("express-session");
var bodyParser = require("body-parser");
const cors = require("cors");
const { sessionStore } = require("./db/store.js");
var habitsApiRouter = require("./routes/api/habits");
var usersApiRouter = require("./routes/api/users");

var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;
});

app.use(express.static("public"));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const IN_PROD = process.env.env === "production";
const TWO_HOURS = 1000 * 60 * 60 * 2;
app.use(
  session({
    name: process.env.session_name,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    secret: process.env.session_secret,
    cookie: {
      maxAge: TWO_HOURS,
      sameSite: true,
      // secure: IN_PROD,
      secure: false,
    },
  })
);

app.use("/habits", habitsApiRouter);
app.use("/users", usersApiRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
