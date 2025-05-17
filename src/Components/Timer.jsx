import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ModeHeader from "./ModeHeader";

const Timer = ({ duration, themeColor }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const percentage = ((duration - timeLeft) / duration) * 100;

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  const playSound = () => {
    const audio = new Audio("/ding.ogg");
    audio.play();
  };

  const showNotification = (title, body) => {
    if (Notification.permission === "granted") {
      new Notification(title, { body });
    }
  };

  const saveSessionToLocal = () => {
    const existing = JSON.parse(localStorage.getItem("workSessions")) || [];
    const now = new Date().toISOString();
    const newSession = { time: now, duration };

    localStorage.setItem("workSessions", JSON.stringify([...existing, newSession]));
  };

  useEffect(() => {
    if (timeLeft === 0) {
      playSound();
      showNotification("🎉 Mission Complete!", "Harika iş çıkardın!");
      saveSessionToLocal();
      return;
    }

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
      <ModeHeader mode="work" themeColor={themeColor} />
      <div style={{ width: 200, height: 200 }}>
        <CircularProgressbar
          value={percentage}
          text={`${Math.floor(timeLeft / 60)}:${String(timeLeft % 60).padStart(2, "0")}`}
          styles={buildStyles({
            textColor: "#333",
            pathColor: themeColor,
            trailColor: "#eee",
          })}
        />
      </div>
    </div>
  );
};

export default Timer;
