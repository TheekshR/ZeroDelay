import React from "react";

const ReactionChecker = ({ status, handleClick, trialNumber, totalTrials }) => {
  if (status === "waiting") {
    return <div className="reaction-box red">Press the Space Bar when the screen turns green</div>;
  }

  if (status === "ready") {
    return (
      <div className="reaction-box green" onClick={handleClick}>
        Trial {trialNumber + 1} of {totalTrials}
      </div>
    );
  }

  return null;
};

export default ReactionChecker;
