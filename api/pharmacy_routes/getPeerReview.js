const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const evidenceitems_id = req.body.evidenceitems_id;
  console.log(req.body.evidenceitems_id);
  db.query(
    "SELECT * FROM peerreviews WHERE evidenceitems_id = ?",
    [evidenceitems_id],
    (err, result) => {
      //   const response = result;
      //   console.log(response.length);
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
