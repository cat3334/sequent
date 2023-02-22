const express = require("express");
const {
  habits_create,
  habits_get,
  habit_insertDay,
  habit_updateDay,
  habit_deleteDay,
  habit_deleteHabit,
} = require("../../controllers/habitsControler");
const router = express.Router();

router.get("/", habits_get);

router.post("/", habits_create);

router.delete("/:id", habit_deleteHabit);

router.post("/:id/:day", habit_insertDay);

router.put("/:id/:day", habit_updateDay);

router.delete("/:id/:day", habit_deleteDay);

module.exports = router;
