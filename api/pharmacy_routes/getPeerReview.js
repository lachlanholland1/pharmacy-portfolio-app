const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log(req.body);
  const evidenceitems_id = req.body.evidenceitems_id;
  const peerreview_id = req.body.peerreview_id;
  console.log(req.body.evidenceitems_id);
  db.query(
    "SELECT * FROM peerreviews WHERE evidenceitems_id = ? AND peerreview_id = ?",
    [evidenceitems_id, peerreview_id],
    (err, result) => {
      console.log(result);
      res.send(result);
    }
  );
});

module.exports = router;
