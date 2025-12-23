import React from "react";

const PreTestForm = ({ formData, setFormData, onStart }) => {
  return (
    <div className="form-container">
      <h2>Pre-Test Form</h2>

      <label htmlFor="sleep">Sleep hours last night:</label>
      <select
        id="sleep"
        value={formData.sleep}
        onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}
      >
        <option value="">Select hours</option>
        <option value="0-4">0–4</option>
        <option value="5-6">5–6</option>
        <option value="7-8">7–8</option>
        <option value="9+">9+</option>
      </select>

      <label htmlFor="caffeine">Caffeine today?</label>
      <select
        id="caffeine"
        value={formData.caffeine}
        onChange={(e) => setFormData({ ...formData, caffeine: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label htmlFor="fatigue">Fatigue level:</label>
      <select
        id="fatigue"
        value={formData.fatigue}
        onChange={(e) => setFormData({ ...formData, fatigue: e.target.value })}
      >
        <option value="">Select level</option>
        <option value="1">1 (Fresh)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Very tired)</option>
      </select>

      <label htmlFor="gamer">Gamer?</label>
      <select
        id="gamer"
        value={formData.gamer}
        onChange={(e) => setFormData({ ...formData, gamer: e.target.value })}
      >
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <button
        className="start-btn"
        disabled={Object.values(formData).includes("")}
        onClick={onStart}
      >
        Start Test
      </button>
    </div>
  );
};

export default PreTestForm;
