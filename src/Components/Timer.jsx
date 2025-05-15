import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const percentage = ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    if (timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  if (timeLeft === 0) {
    return (
      <div className="mission-complete">
        <h1>🎉 Mission Complete!</h1>
        <img src="/DANCE.gif" alt="smiley" width="120" />
      </div>
    );
  }

  return (
    <div className="timer">
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
          styles={buildStyles({
            textColor: "#333",
            pathColor: "#6C63FF",
            trailColor: "#eee",
          })}
        />
      </div>
    </div>
  );
};

export default Timer;
