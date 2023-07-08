const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  var date = new Date();
  const title = req.body.title;
  const userId = req.session.userid;
  const description = req.body.description;
  const impactstatement = req.body.impactstatement;
  const uploaddate = date
    .toISOString()
    .slice(0, 19)
    .replace("T", " ")
    .toString();
  const procurementdate = req.body.date;
  const attachment = req.body.attachment;
 
  db.query(
    "INSERT INTO evidenceitems (users_id, title, description, impactstatement, uploaddate, procurementdate, attachment) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      userId,
      title,
      description,
      impactstatement,
      uploaddate,
      procurementdate,
      attachment,
    ],
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
