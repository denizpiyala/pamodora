import React, { useState, useEffect } from "react";
import TimeInput from "./Components/TimeInput";
import Timer from "./Components/Timer";
import SessionGraph from "./Components/SessionGraph";
import Todo from "./Components/Todo";
import ModeHeader from "./Components/ModeHeader";
import Login from "./Components/Login";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import "./App.css";

function App() {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [themeColor, setThemeColor] = useState("#4CAF50");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => setUser(user));
  }, []);

  const handleLogout = () => signOut(auth);

  const handleStart = (minutes) => {
    setDuration(minutes * 60);
    setIsStarted(true);
  };

  const handleComplete = () => setIsStarted(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <ModeHeader themeColor={themeColor} toggleDarkMode={toggleDarkMode} />

      {user ? (
        <div className="main-container">
          <div className="timer-section">
            <h2>Zamanlayıcı</h2>
            {!isStarted ? (
              <TimeInput onStart={handleStart} />
            ) : (
              <Timer duration={duration} themeColor={themeColor} onComplete={handleComplete} />
            )}
          </div>
          <div className="graph-section">
            <h2>Oturum Grafiği</h2>
            <SessionGraph themeColor={themeColor} user={user} />
          </div>
          <div className="todo-section">
            <h2>Yapılacaklar Listesi</h2>
            <Todo themeColor={themeColor} user={user} />
          </div>
          <button className="logout-btn" onClick={handleLogout}>Çıkış Yap</button>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;