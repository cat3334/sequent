const db = require("../db/db");

exports.habits_get = async () => {
  try {
    const data = await db.pool.query(
      `SELECT activities.activity_id AS id, name, days, frequency, JSON_OBJECTAGG(IFNULL(logs.activity_day, ""), logs.activity_status) AS days FROM activities LEFT JOIN logs ON logs.activity_id = activities.activity_id GROUP BY activities.activity_id`
    );
    return data[0];
  } catch (err) {
    console.error(err);
  }
};

exports.habits_create = async (name) => {
  try {
    await db.pool.query(
      `INSERT INTO activities (name, days, frequency) VALUES ("${name}", 0, 0)`
    );
    // await db.pool.query(
    //   `INSERT INTO logs (activity_id, activity_day, activity_status) VALUES (LAST_INSERT_ID(), "today", "DONE")`
    // );
    return "OK";
  } catch (e) {
    console.error(e);
    return "nei działa, sry ://";
  }
};

exports.habit_insertDay = async (id, day, status) => {
  try {
    await db.pool.query(
      `INSERT INTO logs (activity_id, activity_day, activity_status) VALUES ("${id}", "${day}", "${status}") ON DUPLICATE KEY UPDATE activity_id = "${id}"`
    );
    return "OK";
  } catch (e) {
    console.error(e);
    return "nei działa, sry ://";
  }
};

exports.habit_updateDay = async (id, day, status) => {
  try {
    await db.pool.query(
      `UPDATE logs SET activity_status = "${status}" WHERE activity_id = ${id} AND activity_day = "${day}"`
    );
    return "OK";
  } catch (e) {
    console.error(e);
    return "nei działa, sry ://";
  }
};
