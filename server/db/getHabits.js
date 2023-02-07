const db = require("./db");
const config = require("./config");
const morgan = require("morgan");

async function getHabits() {
  try {
    const data = await db.query(
      `SELECT ID, name, days, frequency     
    FROM activities`
    );
    return {
      data,
    };
  } catch (err) {
    morgan("err");
  }
}

module.exports = {
  getHabits,
};
