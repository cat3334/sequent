const db = require("../db/db");

exports.habits_get = async () => {
  try {
    const data = await db.query(
      `SELECT ID, name, days, frequency     
      FROM activities`
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};
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
