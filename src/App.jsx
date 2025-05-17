import React, { useState, useEffect } from "react";
import TimeInput from "./Components/TimeInput";
import Timer from "./Components/Timer";
import SessionGraph from "./Components/SessionGraph";
import Todo from "./Components/Todo";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./App.css";

function App() {
  const [duration, setDuration] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [themeColor, setThemeColor] = useState("#4CAF50");
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  if (!user) {
    return (
      <div className="auth-container">
        <Login onLogin={() => setUser(auth.currentUser)} />
        <Register onRegister={() => setUser(auth.currentUser)} />
      </div>
    );
  }

  const handleLogout = () => {
    signOut(auth);
  };

  const handleStart = (minutes) => {
    setDuration(minutes * 60);
    setIsStarted(true);
  };

  const handleComplete = async () => {
    setIsStarted(false);
    if (user) {
      await setDoc(doc(db, "users", user.uid, "sessions", new Date().toISOString()), {
        duration,
        completedAt: new Date().toISOString(),
      });
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <div className="theme-picker">
        <label>Pick a color for the theme:</label>
        <input
          type="color"
          value={themeColor}
          onChange={(e) => setThemeColor(e.target.value)}
        />
        <button onClick={toggleDarkMode}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        {user ? <button onClick={handleLogout}>Logout</button> : "Please log in"}
      </div>

      <div className="timer-graph-container">
        {!isStarted ? (
          <TimeInput onStart={handleStart} />
        ) : (
          <Timer duration={duration} themeColor={themeColor} onComplete={handleComplete} user={user} />
        )}
        <SessionGraph themeColor={themeColor} />
      </div>

      <Todo themeColor={themeColor} user={user} />
      <ModeHeader />
    </div>
  );
}

export default App;