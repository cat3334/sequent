const db = require("../db/db");

exports.logs_create = async (name) => {
  try {
    await db.pool.query(
      `INSERT INTO logs (activity_id, activity_day, activity_status) VALUES (${id}, ${day}, "DONE")`
    );
    return "OK";
  } catch (e) {
    console.error(e);
    return "nei działa, sry ://";
  }
};

// LAST_INSERT_ID()
