import React, { useState, useEffect } from "react";
import TimeInput from "./Components/TimeInput";
import Timer from "./Components/Timer";
import SessionGraph from "./Components/SessionGraph";
import Todo from "./Components/Todo";
import ModeHeader from "./Components/ModeHeader";
import "./App.css";

function App() {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [themeColor, setThemeColor] = useState("#4CAF50");

  const handleStart = (minutes) => {
    setDuration(minutes * 60);
    setIsStarted(true);
  };

  const handleComplete = () => {
    setIsStarted(false);
  };

  return (
    <div className="app">
      <div className="theme-picker">
        <label>Pick a color for the theme:</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>

      {!isStarted ? (
        <TimeInput onStart={handleStart} />
      ) : (
        <Timer duration={duration} themeColor={themeColor} onComplete={handleComplete} />
      )}

      <SessionGraph themeColor={themeColor} />
      <Todo themeColor={themeColor} />
    </div>
  );
}

export default App;
