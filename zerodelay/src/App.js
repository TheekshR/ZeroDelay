import React, { useState, useEffect } from "react";
import "./App.css";
import PreTestForm from "./components/PreTestForm";
import ReactionChecker from "./components/ReactionChecker";
import logo from "./assets/ZeroDelayLogo.png";

function App() {
  const TOTAL_TRIALS = 5;

  const [status, setStatus] = useState("form");
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

  const startTest = () => {
    setReactionTime(null);
    setStatus("waiting");

    const delay = Math.random() * 3000 + 2000;
    setTimeout(() => {
      setStartTime(performance.now());
      setStatus("ready");
    }, delay);
  };

  const recordReaction = () => {
    if (status === "ready") {
      const end = performance.now();
      const rt = Math.round(end - startTime);
      setReactionTime(rt);
      setTrialTimes((prev) => [...prev, rt]);
      setStatus("clicked");
    }
  };

  const handleNextTrial = () => {
    if (trialNumber + 1 < TOTAL_TRIALS) {
      setTrialNumber(trialNumber + 1);
      startTest();
    } else {
      setStatus("finished");
    }
  };

  const handleRestart = () => {
    setStatus("form");
    setFormData({ sleep: "", caffeine: "", fatigue: "", gamer: "" });
    setTrialTimes([]);
    setTrialNumber(0);
    setReactionTime(null);
  };

  const averageTime =
    trialTimes.length > 0
      ? Math.round(trialTimes.reduce((a, b) => a + b, 0) / trialTimes.length)
      : 0;

  useEffect(() => {
    const handleKey = (e) => {
      if (status === "ready" && (e.code === "Space" || e.code === "Enter")) {
        recordReaction();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [status, startTime]);

  return (
    <div className="App">
      <img src={logo} alt="ZeroDelay Logo" className="logo" />
      <p className="subtitle">Measure human reaction time under real-world conditions</p>

      {status === "form" && (
        <div className="form-instruction-container three-columns">
          {/* Left: Factors Info */}
          <div className="factors-info">
            <h2>Factors Affecting Reaction Time</h2>
            <ul>
              <li><strong>Sleep:</strong> Less sleep increases reaction delay.</li>
              <li><strong>Caffeine:</strong> Can temporarily improve alertness.</li>
              <li><strong>Fatigue:</strong> High fatigue slows responses.</li>
              <li><strong>Gamer Experience:</strong> Experienced gamers often have faster reactions.</li>
            </ul>
          </div>

          {/* Middle: PreTestForm */}
          <PreTestForm
            formData={formData}
            setFormData={setFormData}
            onStart={() => {
              setTrialNumber(0);
              startTest();
            }}
          />

          {/* Right: How to do the test */}
          <div className="instructions">
            <h2>How to Do the Test</h2>
            <ul>
              <li>Fill out the form with your current conditions.</li>
              <li>Click "Start" to begin the reaction test.</li>
              <li>
                Wait for the screen to turn <span className="green-text">green</span> before reacting.
              </li>
              <li>
                Press the <strong>spacebar</strong> for more accurate results; mouse clicks are slightly slower.
              </li>
              <li>Complete all 5 trials to see your average reaction time.</li>
            </ul>
          </div>
        </div>
      )}

      {(status === "waiting" || status === "ready") && (
        <ReactionChecker
          status={status}
          handleClick={recordReaction}
          trialNumber={trialNumber}
          totalTrials={TOTAL_TRIALS}
        />
      )}

      {status === "clicked" && (
        <div>
          <h2>Trial {trialNumber + 1} Reaction Time: {reactionTime} ms</h2>
          <button className="start-btn" onClick={handleNextTrial}>
            {trialNumber + 1 < TOTAL_TRIALS ? "Next Trial" : "Finish"}
          </button>
        </div>
      )}

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
