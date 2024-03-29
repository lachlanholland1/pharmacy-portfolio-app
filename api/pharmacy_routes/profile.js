const express = require("express");
const db = require("../connection.js");
const dotEnv = require("dotenv");

const router = express.Router();
dotEnv.config();

router.post("/:user", (req, res, next) => {
  const user = req.params.user;
  db.query("select * from Users where username = ?", [user], (err, result) => {
    if (err) {
      res.sendStatus(401);
      return;
    } else if (!result.length) {
      res.sendStatus(401);
      return;
    } else if (!result[0].user_id) {
      res.sendStatus(401);
      return;
    }
    const user = result[0];
    const response = {
      user_id: user.user_id,
      username: user.username,
      first_name: user.firstname,
      last_name: user.surname,
      bio: user.description,
      attachment: user.attachment,
      private_account: user.private_account,
    };
    return res.send(response);
  });
});

module.exports = router;
