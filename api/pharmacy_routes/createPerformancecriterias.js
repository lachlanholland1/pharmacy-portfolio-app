const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const status = req.body.status;
  db.query(
    "INSERT INTO performancecriterias (title, description, status) VALUES (?, ?, ?)",
    [title, description, status],
    (err, result) => {
      if (err) {
        res.sendStatus(401);
        return;}
      res.sendStatus(200);
    }
  );
});

module.exports = router;
