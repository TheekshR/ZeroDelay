import React, { useState, useEffect } from "react";
import "./App.css";
import PreTestForm from "./components/PreTestForm";
import ReactionChecker from "./components/ReactionChecker";
import ResultDisplay from "./components/ResultDisplay";
import logo from "./assets/ZeroDelayLogo.png";

function App() {
  const TOTAL_TRIALS = 5;

  const [status, setStatus] = useState("form"); // form → waiting → ready → clicked → finished
  const [formData, setFormData] = useState({
    sleep: "",
    caffeine: "",
    fatigue: "",
    gamer: "",
  });
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [trialTimes, setTrialTimes] = useState([]);
  const [trialNumber, setTrialNumber] = useState(0);

  // Start a single trial
  const startTest = () => {
    setReactionTime(null);
    setStatus("waiting");

    const delay = Math.random() * 3000 + 2000; // 2–5s random delay
    setTimeout(() => {
      setStartTime(performance.now()); // high precision start
      setStatus("ready");
    }, delay);
  };

  // Handle reaction click or key press
  const recordReaction = () => {
    if (status === "ready") {
      const end = performance.now(); // high precision end
      const rt = Math.round(end - startTime);
      setReactionTime(rt);
      setTrialTimes((prev) => [...prev, rt]);
      setStatus("clicked");
    }
  };

  // Next trial handler
  const handleNextTrial = () => {
    if (trialNumber + 1 < TOTAL_TRIALS) {
      setTrialNumber(trialNumber + 1);
      startTest();
    } else {
      setStatus("finished");
    }
  };

  // Restart all trials
  const handleRestart = () => {
    setStatus("form");
    setFormData({
      sleep: "",
      caffeine: "",
      fatigue: "",
      gamer: "",
    });
    setTrialTimes([]);
    setTrialNumber(0);
    setReactionTime(null);
  };

  // Compute average reaction time
  const averageTime =
    trialTimes.length > 0
      ? Math.round(trialTimes.reduce((a, b) => a + b, 0) / trialTimes.length)
      : 0;

  // Add spacebar listener for reaction
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space") {
        recordReaction();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  return (
    <div className="App">
      <img src={logo} alt="ZeroDelay Logo" className="logo" />
      <h1 className="title">ZeroDelay</h1>
      <p className="subtitle">Measure human reaction time under real-world conditions</p>

      {/* Pre-test Form */}
      {status === "form" && (
        <PreTestForm
          formData={formData}
          setFormData={setFormData}
          onStart={() => {
            setTrialNumber(0);
            startTest();
          }}
        />
      )}

      {/* Reaction Test */}
      {(status === "waiting" || status === "ready") && (
        <ReactionChecker status={status} handleClick={recordReaction} trialNumber={trialNumber} totalTrials={TOTAL_TRIALS} />
      )}

      {/* After each trial */}
      {status === "clicked" && (
        <div>
          <h2>Trial {trialNumber + 1} Reaction Time: {reactionTime} ms</h2>
          <button className="start-btn" onClick={handleNextTrial}>
            {trialNumber + 1 < TOTAL_TRIALS ? "Next Trial" : "Finish"}
          </button>
        </div>
      )}

      {/* After all trials */}
      {status === "finished" && (
        <div>
          <h2>All Trials Completed!</h2>
          <h3>Average Reaction Time: {averageTime} ms</h3>
          <button className="start-btn" onClick={handleRestart}>
            Restart Test
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
