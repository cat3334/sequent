const db = require("../db/db");
const auth = require("../auth.js");
const session = require("express-session");

exports.user_create = async (req, res, next) => {
  try {
    const hashedPassword = await auth.hashPassword(req.body.password);
    await db.pool.query(
      `INSERT INTO users (user_email, user_password) VALUES ("${req.body.email}", "${hashedPassword}")`
    );
    res.status(204).send();
  } catch (e) {
    next(e);
  }
};

exports.user_validate = async (req, res, next) => {
  console.log("DDDDDDDDDD");
  try {
    console.log("DDDDDDDDDD");
    const user_id = await req.session?.user_id;
    console.log(await req.session);
    if (user_id) {
      res.status(200).json(req.session);
    }
  } catch (e) {
    next(e);
  }
};

exports.user_login = async (req, res, next) => {
  try {
    const [dbData] = await db.pool.query(
      `SELECT user_email AS email, user_password AS password, user_id FROM users WHERE user_email = "${req.body.email}"`
    );
    const isPasswordValid = await auth.validatePassword(
      req.body.password,
      dbData[0].password
    );
    if (dbData[0].email && isPasswordValid) {
      // console.log(req.sessionID);
      // req.session.sessionId = req.sessionID;
      req.session.user_id = dbData[0].user_id;
      // return res.json({ xd: "xd" });
      return req.session.save((err) => {
        console.error(err);
        res.json(req.session);
      });
    }
    res.status(402).send({ message: "Bad credentials" });
  } catch (e) {
    next(e);
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

exports.habit_deleteDay = async (id, day, status) => {
  try {
    await db.pool.query(
      `DELETE FROM logs WHERE activity_id = ${id} AND activity_day = "${day}"`
    );
    return "OK";
  } catch (e) {
    console.error(e);
    return "nei działa, sry ://";
  }
};
