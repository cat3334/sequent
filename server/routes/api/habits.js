const express = require("express");
const {
  habits_create,
  habits_get,
  habit_insertDay,
  habit_updateDay,
  habit_deleteDay,
} = require("../../controllers/habitsControler");
const router = express.Router();

router.get("/", habits_get);

router.post("/", habits_create);

router.post("/:id", habit_insertDay);

router.put("/:id", habit_updateDay);

router.delete("/:id", habit_deleteDay);

module.exports = router;
