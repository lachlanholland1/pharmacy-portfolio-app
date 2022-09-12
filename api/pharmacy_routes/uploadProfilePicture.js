const express = require("express");
const router = express.Router();
const db = require("../connection.js");
const AWS = require("aws-sdk")
const { orderBy } = require("lodash")

router.post("/", (req, res, next) => {
AWS.config.update({
    accessKeyId: 'AKIA3HRE4ZH3WV6OPTVM',
    secretAccessKey: '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',
})

const S3_BUCKET ='pharmacyappbucket';
const REGION ='ap-southeast-2';
const URL_EXPIRATION_TIME = 60; // in seconds

const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
});

console.log(req.body.fileName);
console.log(req.body.fileType);

  myBucket.getSignedUrl('putObject', {
      Key: req.body.fileName,
      ContentType: req.body.fileType,
      Expires: URL_EXPIRATION_TIME
  } , (err , url) => {
    console.log(url);
      return res.send({signedUrl: url}); // API Response Here
  });

  const attachment = req.body.fileName;
  const userId = req.body.userId;

  console.log(req.body);
  db.query(
    "UPDATE Users SET attachment = ? WHERE user_id = ?;",
    [attachment, userId],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});



    

module.exports = router;