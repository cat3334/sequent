const express = require("express");
const {
  habits_create,
  habits_get,
  habit_insertDay,
  habit_updateDay,
  habit_deleteDay,
} = require("../../controllers/habitsControler");
const router = express.Router();

router.get("/v1/habits", async (req, res) => {
  res.json(await habits_get());
});

router.post("/v1/habits", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json(await habits_create(req.body.habit));
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/v1/habits/:id", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json(
      await habit_insertDay(req.params.id, req.body.day, req.body.status)
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

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
