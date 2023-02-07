const express = require("express");
const { habits_create } = require("../../controllers/habitsControler");
const router = express.Router();

router.get("/", (req, res) => res.status(200).json("TWOJA STARAAAAA SLAY"));
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
