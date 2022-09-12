const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  db.query(
    "SELECT administrators.idadministrators, Users.email, Users.firstname, Users.surname, administrators.alterprivileges FROM administrators INNER JOIN Users ON Users.user_id = administrators.users_id;",
    (err, result) => {
      res.send({ admins_data: result });
    }
  );
});


module.exports = router;
