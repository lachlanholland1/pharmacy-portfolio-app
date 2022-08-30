const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
    const idevidenceitems = req.body.idevidenceitems;
    console.log(req.body);
    db.query(
        "SELECT * FROM evidenceitems WHERE idevidenceitems = ?",
        [idevidenceitems],
        (err, result) => {
        //   if (err) {
        //     console.log(err);
        //     res.sendStatus(401);
        //     return;}
        // //   res.sendStatus(200);
        console.log(result[0]);
          res.send(result[0]);
        }
      );
});
    module.exports = router;
