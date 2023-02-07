const db = require("../db/db");

exports.habits_create = async (name) => {
  const result = await db.query(
    `INSERT INTO activities (name, days, frequency) VALUES ("${name}", 0, 0)`
  );
  let message = "Error";
  if (result.affectedRows) {
    message = "Success";
  }
  return message;
};
