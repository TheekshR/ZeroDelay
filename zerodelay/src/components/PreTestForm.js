import React from "react";

const PreTestForm = ({ formData, setFormData, onStart }) => {
  return (
    <div className="form-container">
      <h2>Pre-Test Form</h2>

      <label htmlFor="ageRange">Age Range:</label>
      <select
        id="ageRange"
        value={formData.ageRange}
        onChange={(e) => setFormData({ ...formData, ageRange: e.target.value })}
      >
        <option value="">Select age group</option>
        <option value="0-4">Under 13</option>
        <option value="5-6">13–17</option>
        <option value="7-8">18–24</option>
        <option value="9+">25–34</option>
        <option value="10+">35–44</option>
        <option value="11+">45–54</option>
        <option value="12+">55–64</option>
        <option value="13+">65 and over</option>
      </select>

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

      <label htmlFor="gamer">Gaming Experience</label>
      <select
        id="gamer"
        value={formData.gamer}
        onChange={(e) => setFormData({ ...formData, gamer: e.target.value })}
      >
        <option value="">Select</option>
        <option value="1">No experience</option>
        <option value="2">Casual Gamer</option>
        <option value="3">Regular Gamer</option>
        <option value="4">Hardcore Gamer</option>
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
