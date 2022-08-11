const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  const idevidenceitems = Math.random().toString(16).slice(2);
  const title = req.body.title;
  const userId = Math.random().toString(16).slice(2);
  const description = req.body.description;
  const impactstatement = req.body.impactstatement;
//   const uploaddate = req.body.uploaddate;
  const uploaddate = Date.now();
  const procurementdate = req.body.date;
  const attachment = "to do";
  console.log(req.body);
  db.query(
    "INSERT INTO evidenceitems (idevidenceitems, users_id, title, description, impactstatement, uploaddate, procurementdate, attachment) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [idevidenceitems, userId, title, description, impactstatement, uploaddate, procurementdate, attachment],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

module.exports = router;
