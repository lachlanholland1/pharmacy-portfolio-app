const express = require("express");
const db = require("../../../connection.js");
const dotEnv = require("dotenv");

const router = express.Router();
dotEnv.config();

router.post("/", function (req, res, next) {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  db.query(
    "select * from Users where email = ? and password = ?",
    [reqEmail, reqPassword],
    (err, result) => {
      if (err) {
        res.sendStatus(401);
        return;
      } else if (!result.length) {
        res.sendStatus(401);
        return;
      } else if (!result[0].email || !result[0].password) {
        res.sendStatus(401);
        return;
      }
      const user = result[0];
      let isAdmin = 0;
      if (user.password === reqPassword) {
        console.log(user.user_id);
        db.query(
          "select * from administrators where users_id = ?",
          [user.user_id],
          (err, result) => {
            if (err) {
              return;
            }
            if (result.length) {
              isAdmin = 1;
            }
            const session = req.session;
            session.userid = user.user_id;
            res.cookie("user_id", session.userid, { httpOnly: true });
            res.cookie("username", user.username, { httpOnly: true });
            res.cookie("admin", isAdmin, { httpOnly: true });
            const response = {
              user_id: session.userid,
              username: user.username,
              admin: isAdmin,
            };
            return res.send(response);
          }
        );
      }
    }
  );
});

module.exports = router;
