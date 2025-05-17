import React, { useState } from "react";
import TimeInput from "./Components/TimeInput";
import Timer from "./Components/Timer";
import "./App.css";
import WorkHistory from "./Components/WorkHistory";
import Todo from "./Components/Todo";


function App() {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [themeColor, setThemeColor] = useState("#4CAF50");

  const handleStart = (minutes) => {
    setDuration(minutes * 60);
    setIsStarted(true);
  };

  return (
    <div className="app">
      <div className="theme-picker">
        <label>you can pick any color if you want</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
      </div>
      {!isStarted ? (
        <TimeInput onStart={handleStart} />
      ) : (
        <Timer duration={duration} themeColor={themeColor} />
      )}
      <WorkHistory />
      <Todo />

    </div>
  );
}

export default App;
