import React, { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Timer = ({ duration, themeColor, onComplete, user }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      saveSession();
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const saveSession = async () => {
    if (user) {
      await setDoc(doc(db, "users", user.uid, "sessions", new Date().toISOString()), {
        duration,
        completedAt: new Date().toISOString()
      });
    }
  };

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