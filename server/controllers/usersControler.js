const db = require("../db/db");
const auth = require("../auth.js");

exports.user_create = async (req, res, next) => {
  try {
    const hashedPassword = await auth.hashPassword(req.body.password);
    await db.pool.query(
      `INSERT INTO users (user_email, user_name, user_password) 
      VALUES ("${req.body.email}", "${req.body.username}", "${hashedPassword}")`
    );
    const [user_id] = await db.pool.query("SELECT LAST_INSERT_ID() AS id");
    req.session.user_name = req.body.username;
    req.session.user_id = user_id[0].id;
    return req.session.save((err) => {
      if (err) {
        console.error(err);
      }
      res.status(200).json(req.session);
    });
  } catch (e) {
    next(e);
  }
};

exports.user_validate = async (req, res, next) => {
  try {
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
      `SELECT user_email AS email, user_password AS password, user_name, user_id FROM users WHERE user_email = "${req.body.email}"`
    );

    const isPasswordValid = await auth.validatePassword(
      req.body.password,
      dbData[0].password
    );

    if (dbData[0].email && isPasswordValid) {
      req.session.user_id = dbData[0].user_id;
      req.session.user_name = dbData[0].user_name;
      return req.session.save((err) => {
        if (err) {
          console.error(err);
        }
        res.json(req.session);
      });
    }
    res.status(402).send({ message: "Bad credentials" });
  } catch (e) {
    next(e);
  }
};

exports.user_logout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).send();
  } catch (e) {
    next(e);
  }
};
