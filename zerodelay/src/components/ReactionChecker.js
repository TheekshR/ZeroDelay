import React, { useEffect } from "react";
import axios from "axios";

const ReactionChecker = ({
  status,
  handleClick,
  trialNumber,
  totalTrials,
  formData,
  reactionTimes,
  setReactionTimes,
  setAverageReactionTime,
  setStatus
}) => {
  // Handle spacebar press
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && status === "ready") {
        handleClick();
      }
      if (e.code === "Space" && status === "waiting") {
        console.log("Too soon! Wait for green.");
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, handleClick]);

  // Send data to backend when test is done (only once)
  useEffect(() => {
    if (status === "done") {
      if (!reactionTimes || reactionTimes.length === 0) return;

      const avg = Math.round(
        reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length
      );
      setAverageReactionTime(avg);

      const testData = {
        ...formData,
        reactionTimes: reactionTimes,
        averageReactionTime: avg
      };

      axios
        .post("http://localhost:5000/api/tests", testData)
        .then((res) => {
          console.log("Backend response:", res.data); // <-- Debug log
        })
        .catch((err) => {
          console.error("Failed to save test data", err);
        });
    }
  }, [status, reactionTimes, formData, setAverageReactionTime]);

  // Render the reaction box (original behavior preserved)
  if (status === "waiting") {
    return (
      <div className="reaction-box red">
        Press the Space Bar when the screen turns green
      </div>
    );
  }

  if (status === "ready") {
    return (
      <div className="reaction-box green" onClick={handleClick}>
        Trial {trialNumber + 1} of {totalTrials}
      </div>
    );
  }

  if (status === "done") {
    const avg =
      reactionTimes && reactionTimes.length
        ? Math.round(reactionTimes.reduce((a, b) => a + b, 0) / reactionTimes.length)
        : 0;

    return (
      <div className="reaction-box blue">
        Test Complete! Avg: {avg} ms
      </div>
    );
  }

  return null;
};

export default ReactionChecker;
