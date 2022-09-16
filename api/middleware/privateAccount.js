const express = require("express");
const router = express.Router();
const db = require("../connection.js");

const privateAccountMiddleware = (req, res, next) => {
  const username = req.body.user;

  db.query(
    "select * from Users where username = ? AND private_account = false",
    [username],
    (err, result) => {
      if (err) {
        return res.sendStatus(500);
      }
      if (!result.length) {
        return res.sendStatus(403);
      }
      next();
    }
  );
};

module.exports = privateAccountMiddleware;
