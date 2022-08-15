const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const privileges = req.body.privileges;
  const user_id = req.body.user_id;
  db.query(
    "INSERT INTO administrators (users_id, alterprivileges) VALUES (?, ?)",
    [user_id, privileges],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
