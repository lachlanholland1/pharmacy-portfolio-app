const express = require("express");

const router = express.Router();

router.delete("/", (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});

module.exports = router;
