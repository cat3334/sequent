const db = require("./db");

const morgan = require("morgan");

async function postHabits(name) {
  const data = await db.query(
    `INSERT INTO activities (name, days, frequency) VALUES ("${name}", 0, 0)`
  );
  let message = "Error";
  if (data.affectedRows) {
    message = "Success";
  }
  return message;
}

module.exports = {
  postHabits,
};
