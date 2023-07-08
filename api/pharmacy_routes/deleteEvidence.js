const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idevidenceitems = req.body.idevidenceitems;
  db.query(
    "DELETE FROM evidenceitems WHERE idevidenceitems = ?",
    [idevidenceitems],
    (err, result) => {
      if (err) {
        
        res.sendStatus(401);
        return;
      }
      res.sendStatus(200);
    }
  );
});

module.exports = router;
