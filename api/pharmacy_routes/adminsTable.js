const express = require("express");
const router = express.Router();
const db = require("../connection.js");

router.post("/", (req, res, next) => {
  console.log("Here");
  db.query(
    "SELECT Users.email, Users.firstname, Users.surname, administrators.alterprivileges FROM administrators INNER JOIN Users ON Users.user_id = administrators.users_id;",
    (err, result) => {
      console.log(result);
      res.send({ admins_data: result });
    }
  );
});


module.exports = router;
