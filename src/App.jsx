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
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("timer"); // "timer", "graph", "todo"

  const handleStart = (minutes) => {
    setDuration(minutes * 60);
    setIsStarted(true);
  };

  const handleComplete = () => setIsStarted(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="nav-brand">🍅 Pomodoro</div>
        <div className="nav-buttons">
          <button 
            className={`nav-btn ${activeTab === "timer" ? "active" : ""}`}
            onClick={() => setActiveTab("timer")}
          >
            ⏱️ Zamanlayıcı
          </button>
          <button 
            className={`nav-btn ${activeTab === "graph" ? "active" : ""}`}
            onClick={() => setActiveTab("graph")}
          >
            📊 İstatistikler
          </button>
          <button 
            className={`nav-btn ${activeTab === "todo" ? "active" : ""}`}
            onClick={() => setActiveTab("todo")}
          >
            ✓ Görevler
          </button>
          <button 
            className="nav-btn dark-mode-btn"
            onClick={toggleDarkMode}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>

      {/* İçerik */}
      <div className="main-container">
        {activeTab === "timer" && (
          <div className="tab-content">
            <ModeHeader themeColor={themeColor} />
            {!isStarted ? (
              <TimeInput onStart={handleStart} />
            ) : (
              <Timer duration={duration} themeColor={themeColor} onComplete={handleComplete} />
            )}
          </div>
        )}

        {activeTab === "graph" && (
          <div className="tab-content">
            <h2>Çalışma İstatistikleri</h2>
            <SessionGraph themeColor={themeColor} />
          </div>
        )}

        {activeTab === "todo" && (
          <div className="tab-content">
            <h2>Yapılacaklar Listesi</h2>
            <Todo themeColor={themeColor} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;