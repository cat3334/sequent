const session = require("express-session");
const mysqlStore = require("express-mysql-session")(session);
const db = require("./db");
const options = {
  connectionLimit: 10,
  port: process.env.port,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  createDatabaseTable: true,
};

exports.sessionStore = new mysqlStore(options, db.pool);
