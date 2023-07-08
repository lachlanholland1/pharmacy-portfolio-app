const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const framework = req.body.framework;
  db.query(
    "SELECT * FROM "+framework+" WHERE status = 'Active';",
    (err, result) => {
      res.send({ frameworks_data: result });
    }
  );
    
});

module.exports = router;
