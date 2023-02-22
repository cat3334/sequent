const db = require("../db/db");

exports.habits_get = async (req, res, next) => {
  try {
    const query = await db.pool.query(
      `SELECT activities.activity_id AS id, name, JSON_ARRAYAGG(JSON_OBJECT("date", logs.activity_day, "status", logs.activity_status, "log_id", total_id)) AS logs
        FROM activities LEFT JOIN logs ON logs.activity_id = activities.activity_id WHERE activities.user_id = "${req.session.user_id}" GROUP BY activities.activity_id`
    );

    res.json(query[0]);
  } catch (e) {
    next(e);
  }
};

exports.habits_create = async (req, res, next) => {
  try {
    console.log(req.session);
    const response = await db.pool.query(
      `INSERT INTO activities (name, user_id) VALUES ("${req.body.name}", "${req.body.user_id}")`
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

exports.habit_deleteHabit = async (req, res, next) => {
  try {
    await db.pool
      .query(`DELETE FROM logs WHERE activity_id = ${req.params.id}`)
      .then(
        await db.pool.query(
          `DELETE FROM activities WHERE activity_id = ${req.params.id}`
        )
      );

    res.status(204).send();
  } catch (e) {
    next(e);
  }
};
