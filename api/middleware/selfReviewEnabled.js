function selfReviewEnabledMiddle() {
  new Promise((resolve, reject) => {
    db.query(
      "SELECT * evidencereviews WHERE reviewers_id = ?;",
      [user_id],
      (err, result) => {
        if (err) {
          reject(err);
        }
        if (!result.length) {
          reject(Promise.reject());
        }

        resolve();
      }
    );
  });
}
