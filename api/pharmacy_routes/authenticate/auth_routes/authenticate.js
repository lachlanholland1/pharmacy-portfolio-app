const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { cookies } = req;

  console.log("cookies");
  console.log(cookies);
  return res.send({
    authenticated: "true",
    user_id: parseInt(cookies.user_id),
    username: cookies.username,
    admin: cookies.admin,
  });
});

module.exports = router;
