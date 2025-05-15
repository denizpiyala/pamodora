import React, { useState } from "react";
import TimeInput from "./Components/TimeInput";
import Timer from "./Components/Timer";
import "./App.css";


function App() {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const handleStart = (minutes) => {
    setDuration(minutes * 60); 
    setIsStarted(true);
  };

  return (
    <div className="app">
      {!isStarted ? (
        <TimeInput onStart={handleStart} />
      ) : (
        <Timer duration={duration} />
      )}
    </div>
  );
}

export default App;
