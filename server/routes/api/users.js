const express = require("express");
const {
  habit_updateDay,
  habit_deleteDay,
} = require("../../controllers/habitsControler");
const {
  user_create,
  user_login,
  user_validate,
} = require("../../controllers/usersControler");
const router = express.Router();

router.post("/new", user_create);

router.post("/login", user_login);

router.get("/validate", user_validate);

router.put("/v1/habits/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json(
      await habit_updateDay(req.params.id, req.body.day, req.body.status)
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.delete("/v1/habits/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json(
      await habit_deleteDay(req.params.id, req.body.day, req.body.status)
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = router;
