import React from "react";

const ResultDisplay = ({ reactionTime, onRetry }) => {
  return (
    <div>
      <h2>Your Reaction Time: {reactionTime} ms</h2>
      <button className="start-btn" onClick={onRetry}>
        Try Again
      </button>
    </div>
  );
};

export default ResultDisplay;
