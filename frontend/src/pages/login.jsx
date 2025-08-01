import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import React from 'react'

export default function Login() {

  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("/api/login", { email, password });
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            if (response.data.success) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate('/')
            } else {
                alert("Login failed: " + response.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
    };

    return ( 
        <div className="max-w-xl p-4 align-items-center justify-center mx-auto my-24">
            <h2 className="text-center text-pink-700">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mx-auto p-4">
                    <label className="block pb-2">Email:</label>
                    <input className="block p-2 pb-2 border w-md border-gray-300 rounded"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label className="block pb-2">Password:</label>
                    <input className="block p-2 border w-md border-gray-300 rounded"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="block mx-auto p-2 rounded my-2">Login</button>
                </div>
            </form>
            <p className="text-center">Don't have an account? <a href="/register">Register here</a>.</p>
        </div>
     );
}

// const Login = () => {
    
// }
 
// export default Login;