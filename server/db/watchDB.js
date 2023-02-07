var MySQLEvents = require("mysql-events");
var dsn = {
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
};
var mysqlEventWatcher = MySQLEvents(dsn);
console.log(mysqlEventWatcher);
var watcher = mysqlEventWatcher.add(
  "sequent.activities",
  function (oldRow, newRow, event) {
    console.log("TWOJA STARA122222!!!!!");
    //row inserted
    if (oldRow === null) {
      console.log("TWOJA STARA122222!!!!!");
      //insert code goes here
    }

    //row deleted
    if (newRow === null) {
      //delete code goes here
    }

    //row updated
    if (oldRow !== null && newRow !== null) {
      //update code goes here
    }

    //detailed event information
    //console.log(event)
  }
);

module.exports = {
  watcher: watcher,
};
