import React, { useState } from "react";

const TimeInput = ({ onStart }) => {
  const [minutes, setMinutes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (minutes > 0) {
      onStart(parseInt(minutes));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="time-input">
      <h2>Ne kadar çalışmak istiyorsun?</h2>
      <input
        type="number"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Dakika gir..."
        required
      />
      <button type="submit">Başla</button>
      <img src="/WORK.gif" alt="coffee" style={{ width: "100px", marginTop: "20px" }} />
    </form>
  );
};

export default TimeInput;
