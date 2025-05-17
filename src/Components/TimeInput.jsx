import React, { useState } from "react";

const TimeInput = ({ onStart }) => {
  const [minutes, setMinutes] = useState(25);

  const handleChange = (e) => {
    setMinutes(e.target.value);
  };

  const handleStart = () => {
    const parsedMinutes = parseInt(minutes);
    if (!isNaN(parsedMinutes) && parsedMinutes > 0) {
      onStart(parsedMinutes);
    }
  };

  return (
    <div className="time-input">
      <input
        type="number"
        value={minutes}
        onChange={handleChange}
        min="1"
        placeholder="Enter minutes"
      />
      <button onClick={handleStart}>Start Timer</button>
    </div>
  );
};

export default TimeInput;
