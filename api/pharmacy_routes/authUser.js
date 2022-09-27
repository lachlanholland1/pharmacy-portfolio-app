const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");
const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const userId = req.session.userid;
  db.query("select * from Users where user_id = ?", [userId], (err, result) => {
    if (err) {
      res.sendStatus(401);
      return;
    } else if (!result.length) {
      res.sendStatus(401);
      return;
    }
    const user = result[0];
    res.send(user);
  });
});

module.exports = router;
