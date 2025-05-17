import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Timer = ({ duration, themeColor, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) return onComplete();

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, onComplete]);

  const percentage = ((duration - timeLeft) / duration) * 100;

  return (
    <div className="timer">
      <CircularProgressbar
        value={percentage}
        text={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
        styles={buildStyles({
          textColor: "#333",
          pathColor: themeColor,
          trailColor: "#ddd",
        })}
      />
    </div>
  );
};

export default Timer;