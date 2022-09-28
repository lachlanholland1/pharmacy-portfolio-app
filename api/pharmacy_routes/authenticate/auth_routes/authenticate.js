const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  const { cookies } = req;

  return res.send({
    authenticated: "true",
    user_id: cookies.user_id,
    username: cookies.username,
    admin: cookies.admin,
  });
});

module.exports = router;
