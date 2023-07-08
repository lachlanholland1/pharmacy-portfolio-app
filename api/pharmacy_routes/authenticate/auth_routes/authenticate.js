const express = require("express");

const router = express.Router();

router.post("/", (req, res, next) => {
  const { cookies } = req;
  const response = {
    authenticated: "true",
    user_id: parseInt(cookies.user_id),
    username: cookies.username,
    admin: cookies.admin,
  };
  return res.send(response);
});

module.exports = router;
