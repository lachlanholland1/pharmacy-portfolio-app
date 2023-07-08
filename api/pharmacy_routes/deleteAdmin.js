const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const admin_id = req.body.admin_id;
  db.query(
    "DELETE FROM administrators WHERE idadministrators = ?",
    [admin_id],
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
