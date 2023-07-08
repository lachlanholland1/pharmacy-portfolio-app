const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const peerreview_id = req.body.peerreview_id;
  db.query(
    "DELETE FROM peerreviews WHERE peerreview_id = ?",
    [peerreview_id],
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
