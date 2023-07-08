const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const standard = req.body.standards_id;
  const status = req.body.status;
  db.query(
    "INSERT INTO competencies (title, description, standards_id, status) VALUES (?, ?, ?, ?)",
    [title, description, standard, status],
    (err, result) => {
      if (err) {
        
        res.sendStatus(401);
        return;}
      res.sendStatus(200);
    }
  );
});

module.exports = router;
