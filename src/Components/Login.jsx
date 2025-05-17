import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";

const Login = ({ onLogin}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            onLogin();
        } catch (error) {
            alert("Login failed. Try again.");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("Registration successful. You can now log in.");
        } catch (error) {
            alert("Registration failed. Try again.");
        }
    };
    return (
        <div>
            <h2>Login or Register</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 />
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>

                <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Login;