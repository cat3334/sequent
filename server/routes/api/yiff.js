const express = require("express");
const {
  habits_create,
  habits_get,
} = require("../../controllers/habitsControler");
const router = express.Router();

router.get("/", async (req, res) => {
  res.json(await habits_get());
});
router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    res.json(await habits_create(req.body.habit));
  } catch (err) {
    console.log(err);
    next(err);
  }
});
module.exports = router;
