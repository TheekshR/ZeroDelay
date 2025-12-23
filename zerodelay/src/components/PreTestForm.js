import React from "react";

const PreTestForm = ({ formData, setFormData, onStart }) => {
  return (
    <div className="form-container">
      
      <label>Sleep hours last night:</label>
      <select onChange={(e) => setFormData({ ...formData, sleep: e.target.value })}>
        <option value="">Select</option>
        <option value="0-4">0–4</option>
        <option value="5-6">5–6</option>
        <option value="7-8">7–8</option>
        <option value="9+">9+</option>
      </select>

      <label>Caffeine today?</label>
      <select onChange={(e) => setFormData({ ...formData, caffeine: e.target.value })}>
        <option value="">Select</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <label>Fatigue level:</label>
      <select onChange={(e) => setFormData({ ...formData, fatigue: e.target.value })}>
        <option value="">Select</option>
        <option value="1">1 (Fresh)</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5 (Very tired)</option>
      </select>

      <label>Gamer?</label>
      <select onChange={(e) => setFormData({ ...formData, gamer: e.target.value })}>
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
