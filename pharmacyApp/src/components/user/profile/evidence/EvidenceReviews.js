import React from "react";
import EvidenceReviewCard from "./EvidenceReviewCard";

function EvidenceReviews({ reviews }) {
  return (
    <div>
      {reviews.length ? (
        reviews.map((review, index) => (
          <EvidenceReviewCard key={index} review={review} />
        ))
      ) : (
        <div>Evidence has not been reviewed yet.</div>
      )}
    </div>
  );
}

export default EvidenceReviews;
