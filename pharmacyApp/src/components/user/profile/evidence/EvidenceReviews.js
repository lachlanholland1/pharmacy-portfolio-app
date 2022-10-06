import React from "react";
import EvidenceReviewCard from "./EvidenceReviewCard";

function EvidenceReviews({ reviews }) {
  return (
    <div>
      {reviews ? (
        <EvidenceReviewCard review={reviews} />
      ) : (
        <div>This evidence has not been self reviewd.</div>
      )}
    </div>
  );
}

export default EvidenceReviews;
