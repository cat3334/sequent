const db = require("../db/db");

exports.habits_get = async (req, res, next) => {
  try {
    const getUserId = await db.pool.query(
      `SELECT activities.activity_id AS id, name, days, frequency, JSON_ARRAYAGG(JSON_OBJECT("date", logs.activity_day, "status", logs.activity_status, "log_id", total_id)) AS logs
        FROM activities LEFT JOIN logs ON logs.activity_id = activities.activity_id GROUP BY activities.activity_id`
    );
    const query = await db.pool.query(
      `SELECT activities.activity_id AS id, name, days, frequency, JSON_ARRAYAGG(JSON_OBJECT("date", logs.activity_day, "status", logs.activity_status, "log_id", total_id)) AS logs
        FROM activities LEFT JOIN logs ON logs.activity_id = activities.activity_id GROUP BY activities.activity_id`
    );
    //TEST?TES
    console.log(req.sessionID);

    res.json(query[0]);
  } catch (e) {
    next(e);
  }
};

exports.habits_create = async (req, res, next) => {
  try {
    const response = await db.pool.query(
      `INSERT INTO activities (name, days, frequency) VALUES ("${req.body.habit}", 0, 0)`
    );
    return res.json(response);
  } catch (e) {
    next(e);
  }
};

exports.habit_insertDay = async (req, res, next) => {
  try {
    await db.pool.query(
      `INSERT INTO logs (activity_id, activity_day, activity_status) VALUES ("${req.params.id}", "${req.body.day}", "${req.body.status}") ON DUPLICATE KEY UPDATE activity_id = "${req.params.id}"`
    );
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};

exports.habit_updateDay = async (req, res, next) => {
  try {
    await db.pool.query(
      `UPDATE logs SET activity_status = "${req.body.status}" WHERE activity_id = ${req.params.id} AND activity_day = "${req.body.day}"`
    );
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

exports.habit_deleteDay = async (req, res, next) => {
  try {
    await db.pool.query(
      `DELETE FROM logs WHERE activity_id = ${req.params.id} AND activity_day = "${req.body.day}"`
    );
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
