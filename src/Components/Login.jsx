import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin();
    } catch (error) {
      console.error("Authentication Error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Kayıt Ol" : "Giriş Yap"}</h2>
      <form onSubmit={handleAuth}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifre"
          required
        />
        <button type="submit">{isRegister ? "Kayıt Ol" : "Giriş Yap"}</button>
      </form>
      <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
        {isRegister ? "Zaten hesabınız var mı? Giriş Yapın" : "Hesabınız yok mu? Kayıt Olun"}
      </p>
    </div>
  );
};

export default Login;
